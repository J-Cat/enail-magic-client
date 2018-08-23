import * as React from 'react';
import { HomeProps } from './container';
import { Carousel, WingBlank } from 'antd-mobile';

export class Home extends React.Component<HomeProps.IProps, HomeProps.IState> {
    constructor(props: HomeProps.IProps) {
        super(props);
    }

    public render() {
        return (
            <WingBlank>
                <Carousel   
                    autoplay={false}
                    infinite={true}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                >
                    {this.props.profiles.map((profile, index) => {
                        return (<div style={{width: '100%', height: '100%'}} key={index}>{profile.title}</div>);
                    })}
                </Carousel>
            </WingBlank>
        );
    }
}