import * as React from 'react';
import { Link } from 'react-router-dom';

export interface AboutProps { }

const About: React.SFC<AboutProps> = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-ms-10">
                <div className="card ">
                    <div className="card-body font-open">
                        <div className="card-title aboutdiv">About this Blog:</div>
                        <p className="card-text">This blog was created by Heather Till.</p>
                        <div className="card-title aboutdiv">Support provided by:</div>
                        <p className="card-text mb-3">Thanks to Covalence and their excellent staff for all of their guidance and support.</p>
                        <div className="card-title my-5">
                            <p className="card-text">Images created by freepik - www.freepik.com</p>
                        </div>
                        <div>
                            <Link className="btn btn-warning shadow btn-block mx-auto" to={'/'}>Go Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;