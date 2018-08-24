import * as React from 'react';
import { HomeProps } from './container';
import { Carousel, WingBlank, Card, Flex } from 'antd-mobile';

import './home.less';

import thc from '../../assets/thc.svg';
import shatter from '../../assets/shatter.png';

import { Profile } from '../../components/profile';
import { Temperature } from '../../components/temperature';

export class Home extends React.Component<HomeProps.IProps, HomeProps.IState> {
    constructor(props: HomeProps.IProps) {
        super(props);
    }

    public render() {
        return (
            <Flex direction="column" align="stretch" className="Home">
                <div className='row1'>
                    <WingBlank>
                        <Carousel   
                            autoplay={false}
                            infinite={true}
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                            className="Carousel"
                        >
                            {this.props.profiles.map((profile, index) => {
                                return (
                                    <Card key={index} style={{backgroundImage: `url(${shatter})`}}>
                                        <div className='wing' />
                                        <div className='content'>
                                            <Profile />
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
                        <Card style={{backgroundImage: `url(${thc})`}}>
                            <div className='wing' />
                            <div className='content'>
                                <Temperature />
                            </div>
                            <div className='wing' />
                        </Card>
                    </WingBlank>
                </div>
            </Flex>
        );
    }
}