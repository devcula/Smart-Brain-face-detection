import {shallow} from 'enzyme';
import Footer from './Footer';
import React from 'react';


describe("<Footer />", () => {
    it("should render Footer component", () => {
        expect(shallow(<Footer />)).toMatchSnapshot();
    })

    it("should find footer tag", () => {
        const wrapper = shallow(<Footer />);
        expect(wrapper.find('footer')).to.have.lengthOf(3);
        console.log(wrapper.contains('<footer className="footer-distributed">'));
    })
})