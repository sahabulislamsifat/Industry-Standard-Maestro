/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVariables } from "./env";
import { UserModel } from "../modules/user/user.model";
import { UserRole } from "../modules/user/user.interface";

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
        let user = await UserModel.findOne({ email });
        if (!user) {
          user = await UserModel.create({
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
        return done(null, user);
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
