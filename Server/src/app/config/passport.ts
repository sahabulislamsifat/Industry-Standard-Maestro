/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVariables } from "./env";
import { UserModel } from "../modules/user/user.model";
import { IsActive, UserRole } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const isUserExist = await UserModel.findOne({ email });

        if (!isUserExist) {
          return done("User does not exist");
        }

        if (!isUserExist.isVerified) {
          return done("User is not verified");
        }

        if (
          isUserExist.isActive === IsActive.BLOCKED ||
          isUserExist.isActive === IsActive.INACTIVE
        ) {
          return done(`User is ${isUserExist.isActive}`);
        }
        if (isUserExist.isDeleted) {
          return done("User is deleted");
        }

        const isGoogleAuthenticated = isUserExist.auths?.some(
          (providerObjects) => providerObjects.provider == "google"
        );
        if (isGoogleAuthenticated && !isUserExist.password) {
          return done(null, false, {
            message:
              "You have authenticate through google. so if you want to login with credentials, then at first login with google and set a password for your Gmail and then you can login with email and password.",
          });
        }

        const isPasswordMatched = await bcryptjs.compare(
          password as string,
          isUserExist.password as string
        );
        if (!isPasswordMatched) {
          return done(null, false, { message: "password dose not match" });
        }
        return done(null, isUserExist);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: envVariables.GOOGLE_CLIENT_ID,
      clientSecret: envVariables.GOOGLE_CLIENT_SECRET,
      callbackURL: envVariables.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(null, false, { message: "Email not found..." });
        }

        let isUserExist = await UserModel.findOne({ email });
        if (isUserExist && !isUserExist.isVerified) {
          return done(null, false, { message: "User is not verified" });
        }

        if (
          isUserExist &&
          (isUserExist.isActive === IsActive.BLOCKED ||
            isUserExist.isActive === IsActive.INACTIVE)
        ) {
          done(`User is ${isUserExist.isActive}`);
        }

        if (isUserExist && isUserExist.isDeleted) {
          return done(null, false, { message: "User is deleted" });
        }

        if (!isUserExist) {
          isUserExist = await UserModel.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: UserRole.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }
        return done(null, isUserExist);
      } catch (error) {
        console.log("Google Strategy Error:", error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
    done(error);
  }
});

//* FrontEnd localhost:5173 -> localhost:5000/api/v1/auth/google -> passport -> google Oauth consent -> gmail login -> successfully -> callback url localhost:5000/api/v1/auth/google/callback -> db store -> token

//* Bridge ==> google -> user db store -> token
//* Custom ==> email, password, role : USER , name... -> registration -> DB -> user create
//* Google ==> req -> google -> successfully : JWT token : role , email , -> DB -> store -> api access
