"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTiktok, FaGithub, FaLinkedin } from "react-icons/fa";
import { useModalStore } from "@/utils/store/modal.store";
import Image from "next/image";
import icon from "../../src//components//images//small-logo.png";
import { BiCheckShield } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import { MdLogin } from "react-icons/md";
import { PiUserPlus } from "react-icons/pi";
import card from "../components/images/cards.png";
import SideDesign from "./SideDesign";
import checkMark from "../components/images/checkmark.png";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { baseUrl } from "@/utils/baseUrl";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/utils/store/user.store";
import useAxiosInterceptor from "@/api/useAxiosInterceptor";
import { CgDetailsLess } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import Loading from "./Loading";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import trophyTopPlace from "../components/images/trophies/top-star-trophy.png";
import totalScoreStar from "../components/images/trophies/total-score-star.png";
import { GiDna2 } from "react-icons/gi";
import { TbCardsFilled } from "react-icons/tb";
import { FaShuffle } from "react-icons/fa6";
import { AxiosError } from "axios";
import {
  LevelsSchema,
  ChallengesSchema,
  UserDetails,
  Profile,
} from "@/types/user.types";
function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useUserStore();
  const axiosInterceptor = useAxiosInterceptor();
  // const [openSidebar, setOpenSidebar] = useState(() => {
  //   const storedValue = localStorage.getItem("openSidebar");
  //   return storedValue !== null ? JSON.parse(storedValue) : false;
  // });

  const { openAuthMenu, openSidebar, setOpenAuthMenu, setOpenSidebar } =
    useModalStore();
  const { setUserId } = useUserStore();
  const navAuth = [
    {
      name: "REGISTER",
      route: "/auth/signup",
      icon: <PiUserPlus />,
    },
    {
      name: "LOGIN",
      route: "/auth/login",
      icon: <MdLogin />,
    },
  ];
  // const devSocials = [
  //   {
  //     name: "FACEBOOK",
  //     link: "https://www.facebook.com/tanvic.clarito?mibextid=ZbWKwL",
  //     icon: <FaFacebook />,
  //     index: 1,
  //   },
  //   {
  //     name: "TIKTOK",
  //     link: "https://www.tiktok.com/@arcane_mage?is_from_webapp=1&sender_device=pc",
  //     icon: <FaTiktok />,
  //     index: 2,
  //   },
  //   {
  //     name: "GITHUB",
  //     link: "https://github.com/Mana1010",
  //     icon: <FaGithub />,
  //     index: 3,
  //   },
  //   {
  //     name: "LINKEDIN",
  //     link: "https://www.linkedin.com/in/tristan-vic-clarito-a256322a0/",
  //     icon: <FaLinkedin />,
  //     index: 4,
  //   },
  // ];

  const getUser: UseQueryResult<
    UserDetails<
      Profile,
      {
        challenges: ChallengesSchema[];
        levels: LevelsSchema[];
        _id: string;
        username: string;
      }
    >,
    AxiosError<{ message: string }>
  > = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await axiosInterceptor.get(`${baseUrl}/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      const data = response.data.message;
      setUserId(data?.userId._id);
      return data;
    },
    enabled: isAuthenticated && pathname !== "/profile-setup",
  });
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInterceptor.post(
        `${baseUrl}/auth/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user-profile"]);
      toast.success(data.message);
      localStorage.removeItem("token");
      router.push("/auth/login");
    },
    onError: () => {
      toast.success("Failed to logout");
    },
  });
  const arrowRightVariant = {
    visible: {
      rotate: openSidebar ? 180 : 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  const formSideDesignWidthVariants = {
    visible: {
      boxShadow: "0 0 10px #FFE30A",
      width: "20px",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };
  const formSideDesignHeightVariants = {
    visible: {
      boxShadow: "0 0 10px #FFE30A",
      height: "20px",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };
  const icons = [
    <FaShuffle key={0} />,
    <TbCardsFilled key={1} />,
    <GiDna2 key={2} />,
  ];

  const updatedChallengesData = getUser.data?.userId.challenges.map(
    (challenge, index) => {
      return { ...challenge, icon: icons[index] };
    }
  );
  if (pathname === "/profile-setup") return;
  return (
    <div
      className={`absolute h-screen top-0 bottom-0 bg-[#191F23] z-[999999] py-3 ${
        openSidebar ? "w-[260px]" : "sm:w-[70px] w-[10px]"
      } transition-all duration-200 ease-linear`}
    >
      <div className="h-full relative flex flex-col">
        {/* For Sidebar's Header */}
        <motion.button
          variants={arrowRightVariant}
          aria-label={openSidebar ? "Close Sidebar" : "Open Sidebar"}
          animate="visible"
          onClick={setOpenSidebar}
          type="button"
          className="text-secondary text-2xl absolute right-[-10px]"
        >
          <IoIosArrowDroprightCircle />
        </motion.button>
        <div
          className={`overflow-hidden flex-col sm:flex ${
            openSidebar ? "flex" : "hidden"
          }`}
        >
          <header className={`pr-3`}>
            <Link href={"/"}>
              {" "}
              <Image src={icon} alt="icon" width={130} priority />
            </Link>
          </header>
          <div>
            {getUser.isLoading ? (
              <Loading />
            ) : (
              <div>
                {/* For Profile */}
                {isAuthenticated && (
                  <div className="space-y-2 py-5 px-2 flex-grow flex flex-col">
                    <div
                      className={`flex ${
                        openSidebar
                          ? "justify-between space-x-2"
                          : "justify-center"
                      } items-center spce-x-2`}
                    >
                      <div
                        style={{
                          boxShadow: "-1px -1px 5px black",
                          transition: "height 0.3s ease-in-out",
                        }}
                        className={` bg-[#191F23] pt-2 rounded-sm relative w-[150px] ${
                          openSidebar ? "h-[100px]" : "h-[60px]"
                        }`}
                      >
                        <div className="w-full h-full overflow-hidden relative">
                          <Image
                            src={
                              getUser.data?.profileId?.profilePic?.secure_url &&
                              getUser.data?.profileId?.profilePic?.secure_url
                            }
                            fill
                            sizes="100%"
                            alt="icon"
                            priority
                            className="object-cover object-center"
                          />
                          <Image
                            src={card}
                            alt="cards"
                            width={50}
                            priority
                            className="absolute top-[-18px] right-0 z-[-1]"
                          />
                        </div>
                        <SideDesign
                          formSideDesignWidthVariants={
                            formSideDesignWidthVariants
                          }
                          formSideDesignHeightVariants={
                            formSideDesignHeightVariants
                          }
                        />
                      </div>

                      {/* For the records */}
                      <div
                        className={`w-full flex justify-center flex-col space-y-4 ${
                          !openSidebar && "hidden"
                        }`}
                      >
                        <div className="flex space-x-2 items-center">
                          <Image
                            width={20}
                            src={trophyTopPlace}
                            alt="rank"
                            priority
                          />
                          <small
                            style={{ textShadow: "0 0 15px #FFE30A" }}
                            className="text-secondary"
                          >
                            {getUser.data?.rank}
                          </small>
                        </div>
                        <div className="flex space-x-2 items-center">
                          <Image
                            width={20}
                            src={totalScoreStar}
                            alt="score-star"
                            priority
                          />
                          <small
                            style={{ textShadow: "0 0 15px #FFE30A" }}
                            className="text-secondary"
                          >
                            {getUser.data?.bestScore}
                          </small>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`pt-1 ${openSidebar ? "initial" : "hidden"}`}
                    >
                      <small className="text-white break-all">
                        {getUser.data?.userId._id}
                      </small>
                      <h5
                        style={{ textShadow: "0 0 10px #FFE30A" }}
                        className="text-secondary"
                      >
                        {getUser.data?.profileId?.ign}
                      </h5>
                    </div>
                    <div className="w-full flex flex-col pt-5 space-y-2">
                      {openSidebar && (
                        <small className="text-secondary font-semibold">
                          Levels
                        </small>
                      )}
                      <div
                        className={` w-full grid gap-3 flex-grow ${
                          openSidebar ? "grid-cols-3" : "grid-cols-1"
                        }`}
                      >
                        {getUser.data?.userId.levels.map((level, index) => (
                          <div
                            key={level._id}
                            style={{
                              boxShadow: "-1px -1px 3px black",
                              transition: "all 0.3s ease-in-out",
                            }}
                            className="py-1 h-[40px] text-white rounded-sm text-[0.89rem] flex justify-center items-center gap-2 relative"
                          >
                            {new Array(index + 1).fill(0).map((_, index) => (
                              <span
                                key={index}
                                className={`h-[20px] w-1.5 ${
                                  level.isDone && "hidden"
                                } ${
                                  level.isUnlock ? "bg-secondary" : "bg-primary"
                                }`}
                              ></span>
                            ))}
                            {level.isDone && level.isUnlock && (
                              <div className="flex justify-center items-center w-full">
                                <Image
                                  src={checkMark}
                                  width={25}
                                  alt="check-done-image"
                                  priority
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2 flex flex-col space-y-2">
                      {openSidebar && (
                        <small className="text-secondary font-semibold">
                          Challenges
                        </small>
                      )}
                      <div
                        className={` w-full grid gap-3 flex-grow ${
                          openSidebar ? "grid-cols-3" : "grid-cols-1"
                        }`}
                      >
                        {updatedChallengesData?.map((challenge) => (
                          <div
                            key={challenge._id}
                            style={{
                              boxShadow: "-1px -1px 3px black",
                              transition: "all 0.3s ease-in-out",
                            }}
                            className="py-1 h-[40px] rounded-sm flex justify-center items-center overflow-hidden relative"
                          >
                            <span
                              className={`${challenge.isDone && "hidden"} ${
                                challenge.isUnlock
                                  ? "text-secondary"
                                  : "text-primary"
                              } text-xl`}
                            >
                              {challenge.icon}
                            </span>
                            {challenge.isDone && challenge.isUnlock && (
                              <div className="absolute inset-0 flex justify-center items-center">
                                <Image
                                  src={checkMark}
                                  width={30}
                                  alt="check-done-image"
                                  priority
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {/* end of Profile*/}
                <div className={`px-2 pt-2 space-y-2`}>
                  <div className="space-y-2 w-full">
                    {!isAuthenticated && (
                      <div className="space-y-1">
                        <motion.button
                          onClick={setOpenAuthMenu}
                          aria-label="Authentication"
                          style={{ boxShadow: "-1px -1px 5px black" }}
                          className="flex items-center text-white justify-between w-full py-2 px-1 relative overflow-hidden"
                        >
                          <div className={`flex space-x-1 items-center w-full`}>
                            <span className="text-xl">
                              <BiCheckShield />
                            </span>
                            {openSidebar && (
                              <span
                                className={`text-[0.8rem] ${
                                  openSidebar ? "flex" : "hidden"
                                }`}
                              >
                                AUTHENTICATION
                              </span>
                            )}
                          </div>
                          <span
                            style={{
                              transform: `rotate(${
                                openAuthMenu ? "180deg" : "0"
                              })`,
                            }}
                            className={`text-3xl transition-transform duration-200 ease-in`}
                          >
                            <RiArrowDropDownLine />
                          </span>
                        </motion.button>

                        <ul
                          className={`${
                            openAuthMenu ? "flex" : "hidden"
                          } transition-all duration-200 flex-col`}
                        >
                          {navAuth.map((nav) => (
                            <Link
                              aria-label={nav.name}
                              href={nav.route}
                              key={nav.name}
                            >
                              <li
                                style={{ boxShadow: "-1px -1px 3px black" }}
                                className={`flex space-x-2 text-[#EBD30C] text-[0.82rem] items-center p-2 m-1 ${
                                  !openSidebar && "justify-center"
                                }`}
                              >
                                <span>{nav.icon}</span>
                                <span
                                  className={`${
                                    openSidebar ? "flex" : "hidden "
                                  }`}
                                >
                                  {nav.name}
                                </span>
                              </li>
                            </Link>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {!getUser.isLoading && isAuthenticated && (
          <footer
            className={`absolute bottom-0 ${
              openSidebar ? "flex" : "hidden"
            } sm:flex w-full p-1.5 flex-col justify-center items-center space-y-2`}
          >
            <button
              onClick={() => router.push(`/${getUser.data?.userId.username}`)}
              aria-label="account-details-button"
              style={{
                boxShadow: "-1px -1px 3px black",
                transition: "all 0.3s ease-in-out",
              }}
              className="py-2.5 w-full text-white rounded-sm text-[0.89rem] flex justify-center items-center overflow-hidden"
            >
              {openSidebar ? "ACCOUNT DETAILS" : <CgDetailsLess />}
            </button>
            <button
              onClick={() => logoutMutation.mutate()}
              aria-label="logout-button"
              style={{ boxShadow: "-1px -1px 3px black" }}
              className="py-2.5 w-full text-red-400 rounded-sm text-[0.89rem] flex justify-center items-center"
            >
              {openSidebar ? "LOGOUT" : <IoIosLogOut />}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
export default Sidebar;
