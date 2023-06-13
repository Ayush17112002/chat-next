export default function Header() {
  return (
    <div className="navbar flex flex-row items-center justify-between h-11">
      <div className="brand-container pl-10 text-[#000000] font-medium w-1/4 text-2xl">
        Intern<span className="text-[#6422CD]">Town</span>
      </div>
      <div className="navbar-menu pr-10 flex flex-row w-3/4 justify-between">
        <div className="home">Home</div>
        <div className="my-applications">My applications</div>
        <div className="internships">Internships/Jobs</div>
        <div className="bookmarks">Bookmarks</div>
        <div className="chat">Chat</div>
        <div className="profile">My Profile</div>
      </div>
    </div>
  );
}
