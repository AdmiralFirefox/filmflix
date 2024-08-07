import React, { FC, useState, useRef } from "react";
import { useWindowSize, Size } from "../../../hooks/useWindowSize";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Modal from "@mui/material/Modal";
import Image, { StaticImageData } from "next/legacy/image";
import { AvatarData } from "../../../data/profiledata";
import SaveProfilePicButton from "../../Buttons/Modal/SaveProfilePicButton";
import styles from "../../../styles/Modal/ProfileModal/EditProfilePicModal.module.scss";

interface EditProfilePicProps {
  editProfilePicModal: boolean;
  handleCLoseEditProfilePicModal: () => void;
  setEditProfilePicText: React.Dispatch<React.SetStateAction<StaticImageData>>;
  SubmitProfilePicEdit: (id: number) => void;
  profile: { id: number; picture: StaticImageData };
  setEditProfilePic: React.Dispatch<React.SetStateAction<number | boolean>>;
  profilePic: StaticImageData;
}

const EditProfilePicModal: FC<EditProfilePicProps> = ({
  editProfilePicModal,
  handleCLoseEditProfilePicModal,
  setEditProfilePicText,
  SubmitProfilePicEdit,
  profile,
  setEditProfilePic,
  profilePic,
}) => {
  const selectRef = useRef(null);
  const [focus, setFocus] = useState(false);

  const focusProfilePic = () => setFocus(true);
  const unFocusProfilePic = () => setFocus(false);

  useOnClickOutside(selectRef, unFocusProfilePic);

  const size: Size = useWindowSize();

  return (
    <>
      <Modal
        open={editProfilePicModal}
        onClose={handleCLoseEditProfilePicModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles["edit-profile-pic-wrapper-animation"]}>
          <div
            className={styles["edit-profile-pic-wrapper"]}
            style={{ height: `${size.height}px` }}
          >
            <div className={styles["edit-profile-pic-close-icon-wrapper"]}>
              <div
                className={styles["edit-profile-pic-close-icon"]}
                onClick={() => {
                  setEditProfilePic(false);
                  setEditProfilePicText(profilePic);
                }}
              >
                <i className="fas fa-times-circle"></i>
              </div>
            </div>

            <div className={styles["edit-profile-pic-title"]}>
              <h1>Choose Profile</h1>
            </div>

            <div className={styles["profile-pics"]}>
              {AvatarData.map((avatar) => {
                return (
                  <div
                    key={avatar.id}
                    className={styles["edit-profile-container"]}
                    tabIndex={avatar.tabIndex}
                  >
                    <div className={styles["choose-profile"]}>
                      <Image src={avatar.avatar} alt="Avatar Profile" />
                    </div>
                    <div
                      ref={selectRef}
                      className={styles["edit-profile-overlay"]}
                      onClick={() => {
                        setEditProfilePicText(avatar.avatar);
                        focusProfilePic();
                      }}
                    >
                      <div className={styles["edit-profile-icon"]}>
                        <i className="far fa-check-circle"></i>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles["edit-profile-pic-button"]}>
              <SaveProfilePicButton
                SubmitProfilePicEdit={SubmitProfilePicEdit}
                focus={focus}
                profile={profile}
                selectRef={selectRef}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditProfilePicModal;
