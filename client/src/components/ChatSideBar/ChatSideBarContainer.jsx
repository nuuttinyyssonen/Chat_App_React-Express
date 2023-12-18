import Navbar from './Navbar';
import DropDown from './DropDown';
import SearchedUsers from './SearchedUsers';
import ContactList from './ContactList';
import CreateGroupChat from '../CreateGroupChat/CreateGroupChat';

const ChatSideBarContainer = ({
  displayFriendList,
  displayGroupChat,
  displayNavbar,
  displayNewChat,
  newChat,
  newGroupChat,
  dropDown,
  handleLogout,
  search,
  setSearch,
  users,
  data,
  inputRef,
  animationStyle,
  handleNewChat,
  handleNewGroupChat,
  handleDropDown,
  undoCreatePrivateChat
}) => {
  return (
    <div style={data.data?.isDarkMode ? { backgroundColor: 'black', color: 'white', border: '1px solid black' } : { backgroundColor: 'white' }} className="left-side">
      {newChat && <input ref={inputRef} id='createPrivateChatInput' className="search-input" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)}/>}

      <div className='navbar-container' style={animationStyle}>
        {displayNavbar && <Navbar
          user={data}
          handleLogout={handleLogout}
        />}
      </div>

      {displayGroupChat && <div style={animationStyle}>
        <CreateGroupChat
          data={data}
        />
      </div>}

      {displayNewChat && <div style={animationStyle}>
        <SearchedUsers
          users={users}
        />
      </div>}

      {displayFriendList && <div style={animationStyle}>
        <ContactList chats={data.data.chats} data={data}/>
      </div>}

      <DropDown
        dropDown={dropDown}
        handleNewChat={handleNewChat}
        handleNewGroupChat={handleNewGroupChat}
        animationStyle={animationStyle}
        undoCreatePrivateChat={undoCreatePrivateChat}
        newGroupChat={newGroupChat}
        newChat={newChat}
        handleDropDown={handleDropDown}
      />
    </div>
  );
};

export default ChatSideBarContainer;
