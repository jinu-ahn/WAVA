function ProfileIconBtn({ children, customStyle, isLeft, onClick }) {
  return (
    <>
      <label
        onClick={onClick}
        htmlFor="profile-pic-upload"
        className={`absolute bottom-0 ${
          !isLeft && "right-0"
        } ${customStyle} rounded-full p-1 shadow-md cursor-pointer`}
      >
        {children}
      </label>
    </>
  );
}

export default ProfileIconBtn;
