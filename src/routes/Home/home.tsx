import * as React from 'react';
import { Button, Carousel, WingBlank, Card, Flex, ActivityIndicator } from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Profile } from '../../components/profile';
import { Temperature } from '../../components/temperature';

import './home.less';
import thc from '../../assets/thc.svg';
// import shatter from '../../assets/shatter.png';

import { HomeProps } from './container';

export class Home extends React.Component<HomeProps.IProps, HomeProps.IState> {
    // private carousel: Carousel;

    constructor(props: HomeProps.IProps) {
        super(props);
        this.state = {
            commandRunning: false,
            currentIndex: 0
        };
    }

    protected beforeChange = (from: number, to: number) => {
        this.props.setProfile(to);
    }

    public render() {
        return (
            <div className="home-container">
                <Flex direction="column" align="stretch" className="home">
                    <div className='row1'>
                        <WingBlank>
                            <Carousel
                                autoplay={false}
                                infinite={true}
                                beforeChange={this.beforeChange}
                                className="Carousel"
                                selectedIndex={this.props.currentProfileIndex}
                                >
                                {this.props.profiles.length === 0 ? (
                                    <Card key={-1} style={{ backgroundImage: `url(${thc})` }}>
                                        <div className='wing' />
                                        <div className='content'>
                                            <ActivityIndicator />
                                        </div>
                                        <div className='wing' />
                                    </Card>
                                ) : (this.props.profiles.map((profile, index) => (
                                    <Card key={index} style={{ backgroundImage: `url(${thc})` }}>
                                        <div className='wing' />
                                        <div className='content'>
                                            <Profile profile={profile} profileIndex={index} />
                                        </div>
                                        <div className='wing' />
                                    </Card>
                                )))}
                            </Carousel>
                        </WingBlank>
                    </div>
                    <div className='row2'>
                        <WingBlank>
                            <Card style={{ backgroundImage: `url(${thc})` }}>
                                <div className='wing' />
                                <div className='content'>
                                    <Temperature />
                                </div>
                                <div className='wing' />
                            </Card>
                        </WingBlank>
                    </div>
                </Flex>
                <Button className="add-profile-button"><FontAwesomeIcon icon={faPlus} /></Button>
            </div>
        );
    }
}
