import { Link } from "react-router";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Logo from "@/assets/icons/Logo";
import ModeToggle from "@/components/layouts/ModeToggle";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/tours", label: "Tours", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/admin", label: "Dashboard", role: role.superAdmin },
  { href: "/user", label: "Dashboard", role: role.user },
];

const Navbar = () => {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <div>
      <header>
        <div className="max-w-11/12 mx-auto px-4 flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-36 rounded-none mt-4 p-1 md:hidden"
              >
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <div key={index} className="w-full">
                        {link.role === "PUBLIC" && (
                          <NavigationMenuItem>
                            <NavigationMenuLink
                              asChild
                              className="rounded-none text-muted-foreground hover:text-primary py-1.5 font-medium w-full block"
                            >
                              <Link to={link.href}>{link.label}</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                        {link.role === data?.data?.role && (
                          <NavigationMenuItem>
                            <NavigationMenuLink
                              asChild
                              className="text-muted-foreground hover:text-primary py-1.5 font-medium rounded-none w-full block"
                            >
                              <Link to={link.href}>{link.label}</Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )}
                      </div>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>

            {/* Main nav */}
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="/" className="text-primary hover:text-primary/90">
                <Logo />
              </a>
              {/* Navigation menu */}
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  {navigationLinks.map((link, index) => (
                    <div key={index}>
                      {link.role === "PUBLIC" && (
                        <NavigationMenuItem>
                          <NavigationMenuLink
                            asChild
                            className="rounded-none text-muted-foreground hover:text-primary py-1.5 font-medium"
                          >
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )}
                      {link.role === data?.data?.role && (
                        <NavigationMenuItem>
                          <NavigationMenuLink
                            asChild
                            className="text-muted-foreground hover:text-primary py-1.5 font-medium rounded-none"
                          >
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )}
                    </div>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ModeToggle />
            {data?.data?.email && (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-sm rounded-none cursor-pointer hover:text-orange-600"
              >
                Logout
              </Button>
            )}
            {!data?.data?.email && (
              <Button
                asChild
                className="text-sm rounded-none cursor-pointer hover:bg-orange-600"
              >
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
