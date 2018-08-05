import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// eslint-disable-next-line
import background from '!file-loader!../assets/background.jpg';
// eslint-disable-next-line
import profile from '!file-loader!../assets/profile.jpg';
import Pokemons from './Pokemons.js';

const Wrapper = styled.div`
  height: 93vw;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 0;
  overflow: visible;
  img {
    width: 100%;
  }
`;

const Profile = Background.extend`
  position: absolute;
  top: 0;
  width: 100%;
  height: 0;
  overflow: visible;
  text-align: center;
  img {
    width: 50vw;
    border-radius: 50%;
    border: 1px solid #c8e3fb;
    position: relative; 
    top: 30vw;
    -webkit-box-shadow: 11px 16px 156px -27px rgba(0,0,0,0.75);
    -moz-box-shadow: 11px 16px 156px -27px rgba(0,0,0,0.75);
    box-shadow: 11px 16px 156px -27px rgba(0,0,0,0.75);
  }
`;

const ProfileName = Profile.extend`
  span {
    color: #278be3;
    position: relative; 
    top: 83vw;
    font-size: 7vw;
  }
`;

class Home extends React.Component {
  static propTypes = {
    newProp: PropTypes.string,
  };

  render() {
    return (
      <div>
        <Wrapper>
          <Background>
            <img src={background} />
          </Background>
          <Profile>
            <img src={profile} />
          </Profile>
          <ProfileName>
            <span>Youngjae Ji</span>
          </ProfileName>
        </Wrapper>
        <Pokemons />
      </div>
    );
  }
}

export default connect(
  state => ({
    newProp: state.newProp,
  }),
)(Home);
