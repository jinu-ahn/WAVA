function ProfileIconBtn({ children, style, isLeft, onClick }) {
  return (
    <>
      <label
        onClick={onClick}
        htmlFor="profile-pic-upload"
        className={`absolute bottom-0 ${
          !isLeft && "right-0"
        } ${style} rounded-full p-1 shadow-md cursor-pointer`}
      >
        {children}
        {/* <CheckIcon className=" text-white" size={20} /> */}
        {/* <Camera size={20} /> */}
      </label>
    </>
  );
}

export default ProfileIconBtn;
