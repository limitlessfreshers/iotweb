import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar} from 'antd'
import styles from './main.less'
import Menus from './menu'
import { Layout,Button } from 'antd';
import SemanticButton from '../../components/semanticui/semantic-button'
import BadgeBox from './badgeBox';
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;


const style={
  avatarBadge:{
      marginTop:10,
      padding:0,
      backgroundColor:'black'
  }
}
class Header extends React.Component {


  constructor(props) {
      super(props);
		
      this.state = {
         headerColor: localStorage.getItem('berrAdminHeaderColor') ,
         headerBackColor: localStorage.getItem('berrAdminHeaderBackColor')
      }
   }
  

   
  handleClickMenu = e => e.key === 'logout' && logout()
  

render(){
  return (
    <div className={styles.header  + " " + this.props.headerTheme}  >
   
    {this.props.isNavbar
      ? <Popover 
          placement='bottomLeft'
          onVisibleChange={this.props.switchMenuPopover}
          visible={this.props.menuPopoverVisible}
          overlayClassName={styles.popovermenu + " menu_"+ this.props.menuTheme }
          trigger='click'
          content={<Menus  location={this.props.location}  navOpenKeys={this.props.navOpenKeys} changeOpenKeys={this.props.changeOpenKeys}   />}>
          <div className={styles.siderbutton}>
            <Icon type='bars'/>
          </div>
        </Popover>
      : <div className={styles.siderbutton} onClick={this.props.switchSider}>
      <Icon className="foldIcon" type={this.props.siderFold ? 'menu-unfold' : 'menu-fold'}/>
      </div>}
       
       
      <Menu className={'header-menu'} mode='horizontal'  onClick={this.props.handleClickMenu}>
      <SubMenu   className="avatarBadge" title={<Badge dot> <Avatar src="../../assets/avatar/9.jpg" size="default"/></Badge>}>
      <MenuItemGroup>
          <Menu.Item key="setting:1">Profile</Menu.Item>
         
          <Menu.Item key="logout"><span onClick={this.logout}>Logout</span></Menu.Item>
      </MenuItemGroup>
    
  </SubMenu>
        <BadgeBox pr={this.props} />
      </Menu>

      
   
     
    </div>
  )
}
}



export default Header
