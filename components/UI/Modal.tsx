interface ModalProps {
  children: React.ReactNode;
  center?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, center = true }) => {
  return (
    <div className=" w-screen h-screen absolute top-0 left-0 z-50 bg-[#00000080]">
      <div
        className={`w-full  md:w-fit  md:left-1/2 absolute md:-translate-x-1/2 px-4 ${
          center ? "top-1/2 -translate-y-1/2" : "top-24"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
