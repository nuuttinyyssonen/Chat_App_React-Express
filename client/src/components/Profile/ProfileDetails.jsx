import { useRef, useEffect, useState } from 'react';

const ProfileDetails = ({ user, isEditMode, setIsEditMode, statusRef, type, detail, updateDetail, field, setField, errorMessage, isAuthenticated }) => {
  const mountedStyle = { animation: 'inAnimation 300ms ease-in' };
  const unmountedStyle = {
    animation: 'outAnimation 300ms ease-out',
    animationFillMode: 'forwards'
  };

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

  return (
    user.data && <div className="profileDetails">
      {errorMessage && <p className="errorMsg">{errorMessage}</p>}
      {!isAuthenticated && <p>{type}: user</p>}
      {!isEditMode && isAuthenticated &&
      <p ref={statusRef} style={!isEditMode ? mountedStyle : unmountedStyle} onClick={() => handleEditMode()}>{type}: {detail}</p>}
      {isAuthenticated && isEditMode &&
      <div ref={statusRef}>
        <input ref={statusRef} value={field} onChange={e => setField(e.target.value)}/>
        <button onClick={() => updateDetail()}>save</button>
      </div>}
    </div>
  );
};

export default ProfileDetails;
