import { useEffect } from 'react';
import useMountAnimation from '../../hooks/useMountAnimation';

// This component is reused for all status, email and username fields.
const ProfileDetails = ({ user, isEditMode, setIsEditMode, statusRef, type, detail, updateDetail, field, setField, errorMessage, isAuthenticated, searchedUser }) => {
  const animationStyle = useMountAnimation();

  /* This toggles edit mode between on/off based on where user clicks.
  If user's details are clicked then edit mode is turned on and if document is clicked edit mode is turned off. */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setIsEditMode(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [statusRef]);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  console.log(user);

  return (
    user.data && <div className="profileDetails">
      {errorMessage && <p className="errorMsg">{errorMessage}</p>}
      {!isAuthenticated && searchedUser && <p>{type}: {searchedUser.data[type]}</p>}
      {!isEditMode && isAuthenticated &&
      <p ref={statusRef} style={animationStyle} onClick={() => handleEditMode()}>{type}: {detail}</p>}
      {isAuthenticated && isEditMode &&
      <div ref={statusRef}>
        <input ref={statusRef} id='fieldInput' value={field} onChange={e => setField(e.target.value)}/>
        <button id='fieldButton' onClick={() => updateDetail()}>save</button>
      </div>}
    </div>
  );
};

export default ProfileDetails;
