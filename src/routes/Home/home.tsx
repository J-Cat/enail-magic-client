import * as React from 'react';
import { Button, Carousel, Card, Flex, ActivityIndicator } from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Profile } from '../../components/profile';
import { Temperature } from '../../components/temperature';
import { Status } from '../../components/status';

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
            currentIndex: 0,
            mainWidth: 0
        };
    }

    public componentWillMount() {
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    public resize = () => {
        const isPortrait: boolean = window.innerHeight > window.innerWidth;
        this.setState({
            mainWidth: window.innerWidth - (isPortrait ? 16 : 166)
        })
    }

    protected beforeChange = (from: number, to: number) => {
        this.props.setProfile(to);
    }

    public render() {
        return (
            <div className="home-container">
                <Flex direction="column" align="stretch" className="home">
                    <div className='row1'>
                        <Carousel
                            autoplay={false}
                            infinite={true}
                            beforeChange={this.beforeChange}
                            className="Carousel"
                            selectedIndex={this.props.currentProfileIndex}
                            style={{width: `${this.state.mainWidth}px`}}
                            >
                            {this.props.connecting ? (
                                <Card key={-2}>
                                    <div className="wing" />
                                    <div className="content-activity">
                                        <ActivityIndicator text="Connecting ..." />
                                    </div>
                                    <div className='wing' />
                                </Card>
                            ) : (!this.props.connected ? (
                                <Card key={-1}>
                                    <div className="wing" />
                                    <div className="content-activity">
                                        Failed to connect.<br />
                                        Pull-down to try again.
                                    </div>
                                    <div className='wing' />
                                </Card>
                            ) : (this.props.profiles.length === 0 ? (
                                <Card key={-1}>
                                    <div className="wing" />
                                    <div className="content-activity">
                                        Retrieving profiles ...
                                    </div>
                                    <div className='wing' />
                                </Card>
                            ) : (this.props.profiles.map((profile, index) => (
                                <Card key={index}>
                                    <div className='wing' />
                                    <div className='content'>
                                        <Profile profile={profile} profileIndex={index} />
                                    </div>
                                    <div className='wing' />
                                </Card>                                                
                            )))))
                        }
                        </Carousel>
                    </div>
                    <div className='row2'>
                        <Card style={{ backgroundImage: `url(${thc})` }}>
                            <div className='wing' />
                            <div className='content'>
                                <Temperature />
                            </div>
                            <div className='wing'>
                                <Status />
                            </div>
                        </Card>
                    </div>
                </Flex>
                <Button style={{display: this.props.connected ? 'absolute' : 'none'}} className="add-profile-button"><FontAwesomeIcon icon={faPlus} /></Button>
            </div>
        );
    }
}
