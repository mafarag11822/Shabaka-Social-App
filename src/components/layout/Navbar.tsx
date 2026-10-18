import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
  DropdownSection,
  User,
} from "@heroui/react";
import { IoHomeOutline, IoNotificationsOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_vector.svg";
import { useContext } from "react";
import { authContext } from "../../context/authContext";
//==============================================================================//
//==============================================================================//
export default function NavbarComponent() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userData } = useContext(authContext);

  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  function logIn() {
    navigate("/login");
  }
  function createAccount() {
    navigate("/register");
  }

  return (
    <Navbar
      maxWidth="2xl"
      className="bg-white rounded-b-lg border-b-1.5 border-slate-200 font-days"
    >
      <NavbarBrand>
        <Link to={"/"} className="flex gap-1 items-center text-[20px]">
          <Avatar className="bg-white " size="lg" src={logo} />
          <p className="hidden md:block font-bold bg-linear-to-r to-[#01a4c9] via-[#0066FF] from-[#0033B5] bg-clip-text text-transparent">
            SHABAKA
          </p>
        </Link>
      </NavbarBrand>

      {isLoggedIn ? (
        <>
          <NavbarContent
            className="flex gap-4 border-1 text-[#45556c]/70 border-slate-200 rounded-[20px]  bg-slate-100/30 px-2 py-1 h-auto"
            justify="center"
          >
            <NavbarItem>
              <NavLink
                className={({ isActive }) =>
                  `flex gap-1 items-center text-[14px] font-bold p-2 rounded-xl ${isActive ? "text-[#0066FF] p-2 rounded-xl bg-white" : ""}`
                }
                color="secondary"
                to={`/profile/${userData?.id}`}
              >
                <LuUser className="text-[18px] " />{" "}
                <span className="hidden sm:block">Profile</span>
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                className={({ isActive }) =>
                  `flex gap-1 items-center text-[14px] font-bold p-2 rounded-xl ${isActive ? "text-[#0066FF] p-2 rounded-xl bg-white" : ""}`
                }
                color="foreground"
                to="/"
              >
                <IoHomeOutline className="text-[18px]" />{" "}
                <span className="hidden sm:block">Feed</span>
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                className={({ isActive }) =>
                  `flex gap-1 items-center text-[14px] font-bold p-2 rounded-xl ${isActive ? "text-[#0066FF] p-2 rounded-xl bg-white" : ""}`
                }
                color="foreground"
                to="/notifications"
              >
                <IoNotificationsOutline className="text-[18px]" />{" "}
                <span className="hidden sm:block">Notifications</span>
              </NavLink>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    color: "primary",
                    src: userData?.photo,
                  }}
                  classNames={{
                    wrapper: "hidden md:flex",
                  }}
                  className="transition-transform"
                  description={`@${userData?.username}`}
                  name={userData?.name}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                className="font-sans"
              >
                <DropdownItem
                  key="profile"
                  textValue="Profile"
                  className="h-14 gap-2"
                  showDivider
                >
                  <p className="font-semibold text-[#45556c]/70">
                    Signed in as
                  </p>
                  <p className="font-bold">{userData?.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
                <DropdownItem key="help_and_feedback" showDivider>
                  Help & Feedback
                </DropdownItem>
                <DropdownItem
                  onPress={logOut}
                  key="logout"
                  color="danger"
                  textValue="Log Out"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>{" "}
        </>
      ) : (
        <>
          <NavbarContent justify="end">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="shadow" color="primary">
                  Hi, Did you sign in?
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions">
                <DropdownItem
                  key={"login"}
                  className="font-days"
                  description="and continue your social journey"
                  onPress={logIn}
                >
                  Sign In
                </DropdownItem>
                <DropdownSection className="font-days text-center" title={"or"}>
                  <DropdownItem
                    key={"create_account"}
                    className="font-days text-left"
                    description="and start your social journey"
                    onPress={createAccount}
                  >
                    Create an account
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </>
      )}
    </Navbar>
  );
}
