import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { toast } from 'react-toastify';

import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import FaceRecognition, { Box } from '../FaceRecognition/FaceRecognition';
import Profile from '../Profile/Profile';
import Modal from '../Modal/Modal';
import Rank from '../Rank/Rank';
import Logo from '../Logo/Logo';
import { config } from '../../config';
import { useAuth } from '../contexts';
import { User } from '../contexts/AuthContext';

interface Props {
  user: User;
}
const Home: React.FC<Props> = ({ user }: Props) => {
  const { setUser } = useAuth();

  const [dropdownOpen, setOpen] = useState(false);

  const [boxes, setBoxes] = useState<Box[]>([]);
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(value);
  };

  const boundingBox = (data: any): Box[] => {
    const infoBox = data.outputs[0].data.regions;
    const sizeImage: any = document.querySelector('#faceReco');
    const width = Number(sizeImage.width);
    const height = Number(sizeImage.height);

    return infoBox.map((data: any) => {
      return {
        leftCol: data.region_info.bounding_box.left_col * width,
        righCol: width - data.region_info.bounding_box.right_col * width,
        topRow: data.region_info.bounding_box.top_row * height,
        bottomRow: height - data.region_info.bounding_box.bottom_row * height
      };
    });
  };

  const onButtonChange = (): void => {
    setImageUrl(input);
    const token = sessionStorage.getItem('AUTH_TOKEN') || '';
    localStorage.clear();
    fetch(config.backendUrl + 'imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ input })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          toast('API error', { type: 'error' });
          throw new Error('API error');
        }
      })
      .then((response) => {
        if (response) {
          fetch(config.backendUrl + 'image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json', Authorization: token },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then((response) => response.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            })
            .catch(console.error);
        }
        setBoxes(boundingBox(response));
      })
      .catch(console.error);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="mr3 mt2 underline" color="transparent">
            Settings
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => toggleModal()}>Account settings</DropdownItem>
            <DropdownItem
              onClick={() => {
                sessionStorage.clear();
                setUser(null);
              }}
            >
              Log out
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </nav>
      <Rank name={(user && user.name) || ''} entries={(user && user.entries) || 0} />
      <Logo />
      <ImageLinkForm onInputChange={onInputChange} onButtonChange={onButtonChange} />
      <FaceRecognition image={imageUrl} boxes={boxes} />
      {isModalOpen ? (
        <Modal>
          <Profile user={user} toggleModal={() => setIsModalOpen(!isModalOpen)} />
        </Modal>
      ) : null}
    </div>
  );
};
export default Home;
