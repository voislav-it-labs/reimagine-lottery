(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n(30)},26:function(e,t,n){},28:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(18),o=n.n(r),s=(n(26),n(19)),c=n(12),l=n(13),u=n(15),p=n(14),d=n(16),m=(n(28),n(35)),f=n(36),v=n(33),h=n(34),g=["Voislav Mishevski","Blagoj Janev","Aleksandra Vinokikj","Ivan Klandev","Aleksandra Koceva"],k=!0,w=250,b=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).state={entering:!0},n._animate(),n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.state.entering;return i.a.createElement("li",{style:{animationDuration:"".concat(this.props.speed,"ms")},className:e?"winner":"almost-winner"},this.props.name)}},{key:"componentDidUpdate",value:function(e){this.props.name!==e.name&&this._animate()}},{key:"_animate",value:function(){var e=this;setTimeout(function(){return e.setState({entering:!0})}),setTimeout(function(){e.setState({entering:!1})},this.props.speed)}}]),t}(a.Component),S=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e))).toggleStarted=function(){if(!n.state.stopping){clearTimeout(n.winnerTickTimeout);var e=n.state.started,t=!e;e||(n.changePotentialWinner(),n.winnerTick(),n.setState({started:t})),t||(k?n.delayedStop():n.setWinner())}},n.winnerTick=function(){console.log("next tick in",n.state.speed),n.winnerTickTimeout=setTimeout(function(){n.changePotentialWinner(),n.winnerTick()},n.state.speed)},n.changePotentialWinner=function(){var e=n.state.potentialWinner,t=n.state.users.indexOf(e),a=t===n.state.users.length-1?0:t+1;n.setState({potentialWinner:n.state.users[a]})},n.setWinner=function(){n.setState(function(e){return{winners:[].concat(Object(s.a)(e.winners),[e.potentialWinner]),started:!1,stopping:!1,users:e.users.filter(function(t){return t!==e.potentialWinner}),speed:w}})},n.delayedStop=function(){clearTimeout(n.winnerTickTimeout),n.setState({stopping:!0}),n.decreeseSpeed(),n.winnerTick()},n.decreeseSpeed=function(){var e=(2e3-w)/10;Object(m.a)(500).pipe(Object(f.a)(10),Object(v.a)(function(){console.log("ddd"),n.setState(function(t){return{speed:t.speed+e}})}),Object(h.a)(function(){clearTimeout(n.winnerTickTimeout),n.setWinner()})).subscribe(function(){console.log("decreesing speed")})},n.onKeySpaceEnter=function(e){32===e.keyCode&&n.toggleStarted()},n.state={},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentWillMount",value:function(){var e=Math.round(g.length/2),t=g[e];this.setState({users:g,winners:[],potentialWinner:t,speed:w,started:!1,stopping:!1}),document.addEventListener("keyup",this.onKeySpaceEnter)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keyup",this.onKeySpaceEnter)}},{key:"render",value:function(){var e=this.state,t=e.winners,n=e.potentialWinner,a=e.speed,r=e.started;return i.a.createElement("div",{className:"App"},i.a.createElement("div",null,i.a.createElement("button",{type:"button",className:r?"btn btn-stop":"btn btn-start",onClick:this.toggleStarted},i.a.createElement("h3",null,r?"Stop":"Start"))),i.a.createElement("div",{className:""},r&&i.a.createElement("ul",{className:"App-all-users"},i.a.createElement(b,{name:n,winner:!0,speed:a/2}))),!!t.length&&i.a.createElement("div",null,i.a.createElement("div",null,"Winners:"),t.map(function(e){return i.a.createElement("div",{key:e},e)})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,2,1]]]);
//# sourceMappingURL=main.605259f6.chunk.js.map