import { useEffect, useRef, useCallback } from "react";
interface ModalProps {
  children: React.ReactNode;
  center?: boolean;
  onClickBackdrop: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  center = true,
  onClickBackdrop,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const backDropHandler = useCallback((e: MouseEvent) => {
    if (!modalRef?.current?.contains(e.target as Node)) {
      onClickBackdrop();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("click", backDropHandler);
    });
    return () => {
      window.removeEventListener("click", backDropHandler);
    };
  }, [backDropHandler]);

  return (
    <div className=" w-screen h-screen absolute top-0 left-0 z-10 bg-[#00000080] ">
      <div
        className={`w-full  md:w-[480px]  md:left-1/2 absolute md:-translate-x-1/2 px-4  ${
          center
            ? "top-1/2 -translate-y-1/2 animate-fadeIn"
            : "top-24 animate-fadeInMobile"
        }`}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
