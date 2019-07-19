import React from 'react';
import './App.css';

import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import {UmlShow} from './UmlShow'
import {Menu} from './Menu'

function App() {
  const svgSource = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" contentScriptType="application/ecmascript" contentStyleType="text/css" height="215px" preserveAspectRatio="none" style="width:299px;height:215px;" version="1.1" viewBox="0 0 299 215" width="299px" zoomAndPan="magnify"><defs><filter height="300%" id="fbrzg00n1hs25" width="300%" x="-1" y="-1"><feGaussianBlur result="blurOut" stdDeviation="2.0"/><feColorMatrix in="blurOut" result="blurOut2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .4 0"/><feOffset dx="4.0" dy="4.0" in="blurOut2" result="blurOut3"/><feBlend in="SourceGraphic" in2="blurOut3" mode="normal"/></filter></defs><g><line style="stroke: #A80036; stroke-width: 1.0; stroke-dasharray: 5.0,5.0;" x1="33" x2="33" y1="38.2969" y2="174.8281"/><line style="stroke: #A80036; stroke-width: 1.0; stroke-dasharray: 5.0,5.0;" x1="269" x2="269" y1="38.2969" y2="174.8281"/><rect fill="#FEFECE" filter="url(#fbrzg00n1hs25)" height="30.2969" style="stroke: #A80036; stroke-width: 1.5;" width="46" x="8" y="3"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="32" x="15" y="22.9951">Alice</text><rect fill="#FEFECE" filter="url(#fbrzg00n1hs25)" height="30.2969" style="stroke: #A80036; stroke-width: 1.5;" width="46" x="8" y="173.8281"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="32" x="15" y="193.8232">Alice</text><rect fill="#FEFECE" filter="url(#fbrzg00n1hs25)" height="30.2969" style="stroke: #A80036; stroke-width: 1.5;" width="42" x="246" y="3"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="28" x="253" y="22.9951">Bob</text><rect fill="#FEFECE" filter="url(#fbrzg00n1hs25)" height="30.2969" style="stroke: #A80036; stroke-width: 1.5;" width="42" x="246" y="173.8281"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="28" x="253" y="193.8232">Bob</text><polygon fill="#A80036" points="257,65.4297,267,69.4297,257,73.4297,261,69.4297" style="stroke: #A80036; stroke-width: 1.0;"/><line style="stroke: #A80036; stroke-width: 1.0;" x1="33" x2="263" y1="69.4297" y2="69.4297"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacingAndGlyphs" textLength="149" x="40" y="64.3638">Authentication Request</text><polygon fill="#A80036" points="44,94.5625,34,98.5625,44,102.5625,40,98.5625" style="stroke: #A80036; stroke-width: 1.0;"/><line style="stroke: #A80036; stroke-width: 1.0; stroke-dasharray: 2.0,2.0;" x1="38" x2="268" y1="98.5625" y2="98.5625"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacingAndGlyphs" textLength="159" x="50" y="93.4966">Authentication Response</text><polygon fill="#A80036" points="257,123.6953,267,127.6953,257,131.6953,261,127.6953" style="stroke: #A80036; stroke-width: 1.0;"/><line style="stroke: #A80036; stroke-width: 1.0;" x1="33" x2="263" y1="127.6953" y2="127.6953"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacingAndGlyphs" textLength="203" x="40" y="122.6294">Another authentication Request</text><polygon fill="#A80036" points="44,152.8281,34,156.8281,44,160.8281,40,156.8281" style="stroke: #A80036; stroke-width: 1.0;"/><line style="stroke: #A80036; stroke-width: 1.0; stroke-dasharray: 2.0,2.0;" x1="38" x2="268" y1="156.8281" y2="156.8281"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacingAndGlyphs" textLength="212" x="50" y="151.7622">another authentication Response</text><!--
@startuml
Alice -> Bob: Authentication Request
Bob - -> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <- - Bob: another authentication Response
@enduml

PlantUML version 1.2019.03(Sun Mar 10 11:04:44 UTC 2019)
(GPL source distribution)
Java Runtime: OpenJDK Runtime Environment
JVM: OpenJDK 64-Bit Server VM
Java Version: 1.8.0_212-8u212-b01-1~deb9u1-b01
Operating System: Linux
OS Version: 4.9.125-linuxkit
Default Encoding: UTF-8
Language: en
Country: null
--></g></svg>`;
  return (
//     <div className="App">
      

      
// {/* <InlineSVG src={svgSource} /> */}
//     </div>


<Admin dataProvider={restProvider('/model-server/uml')} menu={Menu}>
        <Resource name="svg" show={UmlShow}/>
    </Admin>
  );
}

export default App;
