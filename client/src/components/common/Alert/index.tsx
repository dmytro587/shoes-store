import React from 'react'
import cn from 'classnames'

import { useAppSelector } from '../../../hooks'
import { selectAlert } from '../../../redux/slices/alert'

import s from './Alert.module.sass'

const Alert: React.FC = () => {
   const { message, type } = useAppSelector(selectAlert)

   if (!message) return null

   return (
      <div className={ cn(s.alert, { [s[type || '']]: type }) }>
         <InfoIcon/>
         <span>{ message }</span>
      </div>
   )
}

function InfoIcon() {
   return (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
           width="24" height="24"
           viewBox="0 0 172 172"
           className={ s.svg }>
         <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter"
            strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none"
            fontSize="none" textAnchor="none">
            <path d="M0,172v-172h172v172z" fill="none"/>
            <g fill="#ffffff">
               <path
                  d="M86,0c-47.50716,0 -86,38.49284 -86,86c0,47.50716 38.49284,86 86,86c47.50716,0 86,-38.49284 86,-86c0,-47.50716 -38.49284,-86 -86,-86zM86,14.33333c39.58464,0 71.66667,32.08203 71.66667,71.66667c0,39.58464 -32.08203,71.66667 -71.66667,71.66667c-39.58463,0 -71.66667,-32.08203 -71.66667,-71.66667c0,-39.58463 32.08203,-71.66667 71.66667,-71.66667zM86,41.65625c-1.31576,0 -2.40755,-0.02799 -3.58333,0.22396c-1.17578,0.25195 -2.26758,0.89583 -3.13542,1.56771c-0.86784,0.67188 -1.51172,1.5957 -2.01562,2.6875c-0.5039,1.0918 -0.67187,2.37956 -0.67187,4.03125c0,1.6237 0.16797,2.91146 0.67188,4.03125c0.50391,1.11979 1.14778,2.01563 2.01563,2.6875c0.86784,0.67188 1.95964,1.06381 3.13542,1.34375c1.17578,0.27995 2.26758,0.44792 3.58333,0.44792c1.28776,0 2.65951,-0.16797 3.80729,-0.44792c1.14778,-0.27994 2.04362,-0.67187 2.91146,-1.34375c0.86784,-0.67187 1.51172,-1.56771 2.01563,-2.6875c0.50391,-1.0918 0.89583,-2.40755 0.89583,-4.03125c0,-1.65169 -0.39192,-2.93945 -0.89583,-4.03125c-0.5039,-1.0918 -1.14778,-2.01562 -2.01562,-2.6875c-0.86784,-0.67187 -1.76367,-1.31576 -2.91146,-1.56771c-1.14778,-0.25195 -2.51953,-0.22396 -3.80729,-0.22396zM77.26563,65.61979v64.27604h17.46875v-64.27604z">
               </path>
            </g>
         </g>
      </svg>
   )
}

export default Alert