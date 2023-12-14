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
  mountedStyle,
  unmountedStyle,
  handleNewChat,
  handleNewGroupChat,
  handleDropDown,
  undoCreatePrivateChat
}) => {
  return (
    <div className="left-side">
      {newChat && <input ref={inputRef} className="search-input" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)}/>}

      <div className='navbar-container' style={!newGroupChat && !newChat ? mountedStyle : unmountedStyle}>
        {displayNavbar && <Navbar
          user={data}
          handleLogout={handleLogout}
        />}
      </div>

      {displayGroupChat && <div style={newGroupChat ? mountedStyle : unmountedStyle}>
        <CreateGroupChat
          data={data}
        />
      </div>}

      {displayNewChat && <div style={newChat ? mountedStyle : unmountedStyle}>
        <SearchedUsers
          users={users}
        />
      </div>}

      {displayFriendList && <div style={!newGroupChat && !newChat ? mountedStyle : unmountedStyle}>
        <ContactList chats={data.data.chats} data={data}/>
      </div>}

      <DropDown
        dropDown={dropDown}
        handleNewChat={handleNewChat}
        handleNewGroupChat={handleNewGroupChat}
        mountedStyle={mountedStyle}
        unmountedStyle={unmountedStyle}
        undoCreatePrivateChat={undoCreatePrivateChat}
        newGroupChat={newGroupChat}
        newChat={newChat}
        handleDropDown={handleDropDown}
      />
    </div>
  );
};

export default ChatSideBarContainer;
