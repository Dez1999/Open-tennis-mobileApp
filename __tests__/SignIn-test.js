/**
 * @format
 */

 import 'react-native';
 import React from 'react';
 import SigninDemo from '../src/generalUser/screens/Login/SigninDemo'
 import {render} from '@testing-library/react-native'
 
 
 it('SignIn Screen renders default elements', () => {
        const {getAllByText} = render(<SigninDemo />);

        expect(getAllByText('Login').length).toBe(1);
 });
 
 //Shows invalid inputs messages
 //Handles valid input submit