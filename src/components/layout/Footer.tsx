import homeIcon from "@/assets/icons/footer/home-button.png";
import homeActiveIcon from "@/assets/icons/footer/home-button-active.png";
import sirenIcon from "@/assets/icons/footer/siren.png";
import sirenActiveIcon from "@/assets/icons/footer/siren-active.png";
import chatIcon from "@/assets/icons/footer/chat-bubble.png";
import chatActiveIcon from "@/assets/icons/footer/chat-bubble-active.png";
import myIcon from "@/assets/icons/footer/person.png";
import myActiveIcon from "@/assets/icons/footer/person-active.png";
import { useState } from "react";

const navItems = [
  { id: 0, label: "홈", icon: homeIcon, iconActive: homeActiveIcon },
  { id: 1, label: "도움요청", icon: sirenIcon, iconActive: sirenActiveIcon },
  { id: 2, label: "채팅", icon: chatIcon, iconActive: chatActiveIcon },
  { id: 3, label: "내정보", icon: myIcon, iconActive: myActiveIcon },
];

const Footer = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <nav className="fixed bottom-0 w-[393px] bg-white px-1 py-2 border-t-1  border-lightgray">
        <ul className="grid grid-cols-4 gap-4">
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className="flex cursor-pointer flex-col items-center justify-center gap-1"
            >
              <img
                src={item.id === currentPage ? item.iconActive : item.icon}
                className={`
                    h-[28px] w-[28px] object-contain`}
              />

              <small
                className={`${item.id === currentPage ? "text-primary" : "text-darkgray"} text-xs`}
              >
                {item.label}
              </small>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Footer;
