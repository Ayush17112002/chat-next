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

// <div className="flex flex-row justify-between items-center pt-0 pr-[120px] w-[1440px] h-[72px] gap-[608px] absolute left-0 right-0 shadow-[0_1px_4px_0_rgba(0,0,0,0.1)] bg-[#FEFEFE]">
//   <div className="absolute left-[120px] top-[19px] font-sans not-italic font-medium text-[32px] leading-[35px] text-center text-[#000000]">
//     Intern
//     <div className="inline-block text-[#6422CD]">Town</div>
//   </div>
//   <div className="frame-1 absolute flex flex-row items-center p-0 gap-[24px] left-[681px] top-[14px]">
//     <div className="frame-2 flex flex-row p-0 gap-[24px] w-[571px] h-[44.12px] items-start flex-none order-none grow-0">
//       <div className="frame-3 flex flex-row p-0 gap-[24px] w-[503px] h-[44.12px] items-center flex-none order-none grow-0">
//         <div className="frame-4 flex flex-row p-0 gap-[24px] w-[435px] h-[44.12px] items-center flex-none order-none grow-0">
//           <div className="frame-5 flex flex-row p-0 gap-[24px] w-[274px] h-[41px] items-center flex-none order-none grow-0">
//             <div className="frame-6 flex flex-col p-[10px] gap-[10px] w-[137px] h-[41px] items-start flex-none order-none grow-0">
//               <div className="top-[10px] left-[10px] w-[117px] h-[21px] flex-none order-none grow-0">
//                 <div className="absolute left-[37px] font-poppins font-normal not-italic text-center text-[14px] text-[#000000CC] leading-[21px]">
//                   Home
//                 </div>
//               </div>
//             </div>
//             <div className="frame-7 flex flex-col p-[10px] gap-[10px] w-[137px] h-[41px] items-start flex-none order-1 grow-0">
//               <div className="top-[10px] left-[10px] w-[117px] h-[21px] flex-none order-none grow-0">
//                 <div className="relative left-[3px] font-poppins font-normal text-center w-[111px] h-[21px] text-[14px] m-0 text-[#000000CC] leading-[21px]">
//                   My applications
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col items-start p-[10px] gap-[10px] left-[298px] flex-none order-1 grow-0">
//             <div className="top-[10px] left-[10px] w-[117px] h-[21px] flex-none order-none grow-0">
//               <div className="absolute font-poppins font-normal not-italic text-center text-[14px] text-[#000000CC] leading-[21px]">
//                 Internships/Jobs
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
