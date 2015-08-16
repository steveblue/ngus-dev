declare var famous: any;import {Component,View,bootstrap,} from 'angular2/angular2';import {FaNode,FaCamera,FaDomElement,FaMesh} from 'ngus/dist/system/ngus';// App@Component({  selector: 'ngus-app'})@View({  directives: [ FaNode, FaCamera, FaDomElement, FaMesh ],  template: `    <fa-node>        <fa-camera [depth]="500"></fa-camera>    </fa-node>    <fa-node [origin]="[0.5,0.5,0.5]"             [mountPoint]="[0.5,0.5,0.5]"             [align]="[0.25,0.5,0.0]"             [sizeMode]="['absolute','absolute', 'absolute']"             [absoluteSize]="[200,200,200]"             [scale]="[2.0,2.0,2.0]"             [rotate]="rotate.famous"             [component]="famousComponent">             <fa-element [properties]="{backgroundImage:'url(screenshots/famous.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'top left'}"                         [content]="''"                         [id]="'famous-spinner'"                         [classes]="['class1','class2','class3']">             </fa-element>    </fa-node>    <fa-node [origin]="[0.5,0.5,0.5]"             [mountPoint]="[0.5,0.5,0.5]"             [align]="[0.5,0.5,0.0]"             [sizeMode]="['absolute','absolute', 'absolute']"             [absoluteSize]="[200,200,200]"             [rotate]="rotate.mesh"             [component]="meshComponent">             <fa-mesh [geometry]="'Tetrahedron'"                      [detail]="100"                      [color]="'#FB9F89'">             </fa-mesh>    </fa-node>    <fa-node [origin]="[0.5,0.5,0.5]"             [mountPoint]="[0.5,0.5,0.5]"             [align]="[0.75,0.5,0.0]"             [sizeMode]="['absolute','absolute', 'absolute']"             [absoluteSize]="[200,200,200]"             [scale]="[2.0,2.0,2.0]"             [rotate]="rotate.angular"             [component]="angularComponent">              <fa-gesture-handler [drag]="dragFamous"></fa-gesture-handler>             <fa-element [attr]="{lang: 'ar', dir: 'ltr', contenteditable: true}"                         [properties]="{backgroundImage:'url(screenshots/angular-2.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'top left'}"                         [content]="''">             </fa-element>    </fa-node>  `})class App {  rotate: Object;  famousComponent: Object;  angularComponent: Object;  meshComponent: Object;  dragFamous: any;  receiver: any;  constructor() {      var app = this;      this.rotate = {          famous:[0,0,0],          angular:[0,0,0],          mesh: [0,0,0]      };      this.famousComponent = {        id: null,        node: null,        onMount: function (node) {            this.id = node.addComponent(this);            node.requestUpdate(this.id);            this.node = node;        },        onUpdate: function (time) {            this.node.setRotation(0,time / 832,0);            //app.rotate.famous = [0,time / 832,0];            this.node.requestUpdateOnNextTick(this.id);        }      };      this.receiver = {        id: null,        node: null,        onMount: function (node) {            this.id = node.addComponent(this);            node.requestUpdate(this.id);            this.node = node;        },        onUpdate: function (time) {            this.node.setRotation(0,time / 832,0);            //app.rotate.famous = [0,time / 832,0];            this.node.requestUpdateOnNextTick(this.id);        },        onReceive: function(event, payload){            console.log(event,payload);        }      };      this.dragFamous = function(e) {          switch (e.status) {            case 'start':              //console.log('start drag',e, this.getPosition());              break;            case 'end':              //console.log('end drag',e, this.getPosition();              break;            case 'move':              let d = e.centerDelta;              let pos = this.getPosition();              this.setPosition(d.x+pos[0],d.y+pos[1],pos[2]);              break;          }      };      this.meshComponent = {        id: null,        node: null,        onMount: function (node) {            this.id = node.addComponent(this);            node.requestUpdate(this.id);            this.node = node;        },        onUpdate: function (time) {            this.node.setRotation(time / 539,time / 539,time / 539);            //app.rotate.mesh = [time / 539,time / 539,time / 539];            this.node.requestUpdateOnNextTick(this.id);        }      };      this.angularComponent = {        id: null,        node: null,        onMount: function (node) {            this.id = node.addComponent(this);            node.requestUpdate(this.id);            this.node = node;        },        onUpdate: function (time) {            this.node.setRotation(0,time / 1139,0);            //app.rotate.angular = [0,time / 1178,0];            this.node.requestUpdateOnNextTick(this.id);        }      };  }}bootstrap(App);