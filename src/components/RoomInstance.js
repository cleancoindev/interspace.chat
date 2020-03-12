import React, { useState } from "react";
import styled from "styled-components";

import { RoomURLs } from "../utils/constants";
import JitsiInstance from './integrations/JitsiInstance';
import YoutubeInstance from './integrations/YoutubeInstance';
// import HubInstance from './integrations/HubInstance';

const SERVICES = {
  jitsi: {
    title: 'Jisti',
    component: JitsiInstance,
  },
  mozillaHub: {
    title: 'Virtual Hub',
    external: true,
  },
  youtube: {
    title: 'Youtube',
    component: YoutubeInstance,
  },
};


const ServiceButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: black;
  border-bottom: 1px solid white;
`;

const ServiceButton = styled.div`
  height: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #616161;
  }
  &.active {
    background-color: #423838;
  }
`;

const RoomInstance = ({width, height, space}) => {
  const roomURLs = RoomURLs[space];
  const availableServiceNames = Object.keys(roomURLs);

  const [selectedServiceName, selectServiceName] = useState(availableServiceNames[0]);

  if(availableServiceNames.length === 0) return <div>Unknown room</div>;

  const roomData = roomURLs[selectedServiceName];
  const selectedService = SERVICES[selectedServiceName];
  const RoomServiceComponent = selectedService.component;

  function onServiceClick(name) {
    const service = SERVICES[name];
    if(service.external) {
      const roomData = roomURLs[name];
      window.open(roomData.externalUrl)
    } else {
      selectServiceName(name);
    }
  }

  return (
    <div>
      <ServiceButtonContainer>
        {
          availableServiceNames.map(serviceName =>
            <ServiceButton
              key={serviceName}
              onClick={() => onServiceClick(serviceName)}
              className={selectedServiceName === serviceName && 'active'}
            >
              <span>{SERVICES[serviceName].title}</span>
              {SERVICES[serviceName].external &&
              <i className="fas fa-external-link-alt" style={{ marginLeft: 10 }}/>
              }
            </ServiceButton>
          )
        }
      </ServiceButtonContainer>

      <RoomServiceComponent width={width} height={height} roomData={roomData} />
    </div>
  );
};

export default RoomInstance;
