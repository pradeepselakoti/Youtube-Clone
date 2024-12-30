import React from 'react'
import './sideNavbar.css'
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ContentCutIcon from '@mui/icons-material/ContentCut';
const SideNavbar=({sideNavbar})=>{
  return(
    <div className={sideNavbar?'home-sideNavbar':'homeSideNavbarHide'}>
        <div className='home_sideNavbarTop'>
            <div className={`home_sideNavbarTopOption`}>
                <HomeIcon />
                <div className='home_sideNavbarTopOptionTitle'>Home</div>
             </div>
                <div className={`home_sideNavbarTopOption`}>
                <VideocamIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Shorts</div>
            </div>
                <div className={`home_sideNavbarTopOption`}>
                <SubscriptionsIcon />
                <div className='home_sideNavbarTopOptionTitle'>Subscription</div>
           
            </div>
        </div>
        <div className="home_sideNavbarMiddle">
        <div className={`home_sideNavbarTopOption`}>
        <div className='home_sideNavbarTopOptionTitleHeader'>You</div>
            <ChevronRightIcon/>
             </div>

             <div className={`home_sideNavbarTopOption`}>
             <RecentActorsIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Your channel</div>
             </div>

             <div className={`home_sideNavbarTopOption`}>
                <HistoryIcon/>
                <div className='home_sideNavbarTopOptionTitle'>History</div>
             </div>

             <div className={`home_sideNavbarTopOption`}>
                <QueueMusicIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Playlist</div>
             </div>

             <div className={`home_sideNavbarTopOption`}>
                <OndemandVideoIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Your videos</div>
             </div>

             <div className={`home_sideNavbarTopOption`}>
                <AccessTimeIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Watch later</div>
             </div>

             <div className={`home_sideNavbarTopOption`}>
                <ThumbUpOffAltIcon />
                <div className='home_sideNavbarTopOptionTitle'>Liked videos</div>
             </div>

             <div className={`home_sideNavbarTopOption`}>
                <ContentCutIcon/>
                <div className='home_sideNavbarTopOptionTitle'>Your clips</div>
             </div>
        </div>
            
             <div className='home_sideNavbarMiddle'>
             <div className={`home_sideNavbarTopOption`}>
                <div className='home_sideNavbarTopOptionTitleHeader'>Subscription</div>
             </div>

             <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
                    <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
                    <div className="home_sideNavbarTopOptionTitle">WWE</div>
                </div>

                <div className="home_sideNavbarTopOption">
                    <img className='home_sideNavbar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
                    <div className="home_sideNavbarTopOptionTitle">News India</div>
                </div>
        </div>

    </div>
  )
}

export default SideNavbar 