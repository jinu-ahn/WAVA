import { useState, useLayoutEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import LoginMenu from "./LoginMenu";
import LogoutMenu from "./LogoutMenu";
import MobileLoginMenu from "./MobileLoginMenu";
import MobileLogoutMenu from "./MobileLogoutMenu";
import useUserStore from "../../store/userStore";

function Navbar() {
  const isLogin = useUserStore((state) => state.isLogin);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hiddenNav, setHiddenNav] = useState(false);
  const location = useLocation();
  useLayoutEffect(() => {
    if (
      location.pathname.match("/dashboard") ||
      location.pathname.match("/channel")
    ) {
      setHiddenNav(true);
    } else {
      setHiddenNav(false);
    }
    setMobileMenuOpen(false);
  }, [location]);

  if (hiddenNav) return null;
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-6"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img alt="" src="/wavalogo.png" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-mainTxt"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:gap-x-12">
          {isLogin ? <LogoutMenu /> : <LoginMenu />}
          {/* <Link
            to="/dashboard"
            className="text-sm font-semibold leading-6 text-mainTxt hover:text-mainBlue"
          >
            대시보드
          </Link>
          <Link
            to="/channel"
            className="text-sm font-semibold leading-6 text-mainTxt hover:text-mainBlue"
          >
            채널
          </Link>
          <Link
            to="/login"
            className="text-sm font-semibold leading-6 text-mainTxt hover:text-mainBlue"
          >
            로그인
          </Link> */}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img alt="" src="/wavalogo.png" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-mainTxt"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {isLogin ? <MobileLogoutMenu /> : <MobileLoginMenu />}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Navbar;
