import React, { Component } from 'react'

export default class waiting extends Component {
  render() {
    return (
      <div className="fp-waiting" style={{textAlign: 'center', margin: '0 auto', maxWidth: 1024, width: '100%', left: '50%', transform: 'translateX(-50%)', height: 576, position: 'absolute', zIndex: -1}}>           <svg className="fp-loading-sharp-outline" width="112px" height="112px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <rect x="0" y="0" width="76" height="76" fill="rgba(0,0,0,0)" className="bk"></rect>
  <rect x="-9" y="-9" width="18" height="18" transform="translate(25 25) scale(1 1)" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3%" className="sq">
    <animate attributeName="stroke" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.0s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.0s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
  </rect>
  <rect x="-9" y="-9" width="18" height="18" transform="translate(50 25) scale(0.829167 0.829167)" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3%" className="sq">
    <animate attributeName="stroke" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.4s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.4s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
  </rect>
  <rect x="-9" y="-9" width="18" height="18" transform="translate(50 50) scale(1 1)" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3%" className="sq">
    <animate attributeName="stroke" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.8s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.8s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
  </rect>
  <rect x="-9" y="-9" width="18" height="18" transform="translate(25 50) scale(1 1)" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3%" className="sq">
    <animate attributeName="stroke" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="1.2s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="1.2s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
  </rect>
</svg>
           <svg className="fp-loading-sharp-fill" width="112px" height="112px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
  <rect x="0" y="0" width="76" height="76" fill="rgba(0,0,0,0)" className="bk"></rect>
  <rect x="-10" y="-10" width="20" height="20" transform="translate(25 25) scale(1 1)" fill="rgba(0,0,0,.5)" className="sq">
    <animate attributeName="fill" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.0s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
    <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.0s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
  </rect>
  <rect x="-10" y="-10" width="20" height="20" transform="translate(50 25) scale(0.829167 0.829167)" fill="rgba(0,0,0,.5)" className="sq">
    <animate attributeName="fill" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.4s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
    <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.4s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
  </rect>
  <rect x="-10" y="-10" width="20" height="20" transform="translate(50 50) scale(1 1)" fill="rgba(0,0,0,.5)" className="sq">
    <animate attributeName="fill" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.8s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
    <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.8s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
  </rect>
  <rect x="-10" y="-10" width="20" height="20" transform="translate(25 50) scale(1 1)" fill="rgba(0,0,0,.5)" className="sq">
    <animate attributeName="fill" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="1.2s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
    <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="1.2s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
  </rect>
</svg>
           <svg className="fp-loading-rounded-fill" width="112px" height="112px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <rect x="0" y="0" width="76" height="76" fill="rgba(0,0,0,0)" className="bk"></rect>
    <circle cx="0" cy="0" r="10" transform="translate(25 25) scale(1 1)" fill="rgba(0,0,0,.5)" className="sq">
      <animate attributeName="fill" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.0s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.0s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
    </circle>
    <circle cx="0" cy="0" r="10" transform="translate(50 25) scale(0.829167 0.829167)" fill="rgba(0,0,0,.5)" className="sq">
      <animate attributeName="fill" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.4s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.4s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
    </circle>
    <circle cx="0" cy="0" r="10" transform="translate(50 50) scale(1 1)" fill="rgba(0,0,0,.5)" className="sq">
      <animate attributeName="fill" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.8s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.8s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
    </circle>
    <circle cx="0" cy="0" r="10" transform="translate(25 50) scale(1 1)" fill="rgba(0,0,0,.5)" className="sq">
      <animate attributeName="fill" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="1.2s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="1.2s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
    </circle>
</svg>
           <svg className="fp-loading-rounded-outline" width="112px" height="112px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <rect x="0" y="0" width="76" height="76" fill="rgba(0,0,0,0)" className="bk"></rect>
    <circle cx="0" cy="0" r="10" transform="translate(25 25) scale(1 1)" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3%" className="sq">
      <animate attributeName="stroke" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.0s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.0s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
    </circle>
    <circle cx="0" cy="0" r="10" transform="translate(50 25) scale(0.829167 0.829167)" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3%" className="sq">
      <animate attributeName="stroke" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.4s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.4s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
    </circle>
    <circle cx="0" cy="0" r="10" transform="translate(50 50) scale(1 1)" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3%" className="sq">
      <animate attributeName="stroke" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="0.8s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="0.8s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
    </circle>
    <circle cx="0" cy="0" r="10" transform="translate(25 50) scale(1 1)" fill="none" stroke="rgba(0,0,0,.5)" strokeWidth="3%" className="sq">
      <animate attributeName="stroke" from="rgba(0,0,0,0)" to="rgba(0,0,0,.5)" repeatCount="indefinite" dur="1.6s" begin="1.2s" values="rgba(0,0,0,.5);rgba(0,0,0,0);rgba(0,0,0,0);rgba(0,0,0,.5);rgba(0,0,0,.5)" keyTimes="0;0.1;0.2;0.4;1"></animate>
      <animateTransform attributeName="transform" type="scale" additive="sum" from="0.8" to="1" repeatCount="indefinite" begin="1.2s" dur="1.6s" values="1;0.8;0.8;1;1" keyTimes="0;0.1;0.2;0.4;1"></animateTransform>
    </circle>
</svg>
         </div>
         )
  }
}