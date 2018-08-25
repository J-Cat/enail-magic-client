import * as React from 'react';
import { Button, Carousel, WingBlank, Card, Flex } from 'antd-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { Profile } from '../../components/profile';
import { Temperature } from '../../components/temperature';

import './home.less';
import thc from '../../assets/thc.svg';
// import shatter from '../../assets/shatter.png';

import { HomeProps } from './container';

export class Home extends React.Component<HomeProps.IProps, HomeProps.IState> {
    constructor(props: HomeProps.IProps) {
        super(props);
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
                                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                afterChange={index => console.log('slide to', index)}
                                className="Carousel">
                                {this.props.profiles.map((profile, index) => {
                                    return (
                                        <Card key={index} style={{ backgroundImage: `url(${thc})` }}>
                                            <div className='wing' />
                                            <div className='content'>
                                                <Profile profile={profile} />
                                            </div>
                                            <div className='wing' />
                                        </Card>
                                    );
                                })}
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
                <Button className="add-profile-button"><FontAwesomeIcon icon={faPlusCircle} /></Button>
            </div>
        );
    }
}
