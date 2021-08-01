import { React, useState, useEffect, useRef, useLayoutEffect } from "react";
import reactDom from "react-dom";

//posibly update with https://www.npmjs.com/package/@react-hook/resize-observer to auto get child (scaled) height

function useWindowSize() {
   const [size, setSize] = useState([0, 0]);
   useLayoutEffect(() => {
      function updateSize() {
         setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return (_) => window.removeEventListener("resize", updateSize);
   }, []);
   return size;
}

function UniformScale(props) {
   const wrapper = useRef(null);
   const scaled = useRef(null);
   const [refresh, setRefresh] = useState(false);
   const [width, height] = useWindowSize();
   // const [refresh, setRefresh] = useState(false);

   // useEffect(() => {
   //    var timer = setTimeout(() => {
   //       setRefresh(!refresh);
   //    }, 10);
   //    return () => {
   //       clearTimeout(timer);
   //    };
   // }, [props.level]);

   const wrapperStyle = {
      width: "100%",
      maxWidth: "1100px",
      minWidth: "780px",
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
      overflow: "hidden",

      // backgroundColor: "red",
   };

   const scaledStyle = {
      width: props.internalWidth,
      transformOrigin: "0px 0px",

      // verticalAlign: "top",
   };

   let scale = 1;

   if (wrapper.current) {
      const wrapperWidth = wrapper.current.clientWidth;
      scale = wrapperWidth / props.internalWidth;
      scaledStyle.transform = `scale(${scale})`;

      if (scaled.current) {
         //const scaledHeight = scaled.current.clientHeight; //calc real variable height. however problem if child height changes and parent doesnt re-render
         let scaledHeight = props.internalHeight;

         if (props.auto == true) {
            scaledHeight = scaled.current.clientHeight;
         }

         if (props.matchHeight) {
            scaledHeight = props.matchHeight.current.clientHeight;
         }

         wrapperStyle.height = scaledHeight * scale;
      }
   }

   useEffect(() => {
      setTimeout(() => {
         setRefresh(!refresh);
      }, 100);
   }, [props.refreshOnChange]);

   useEffect(() => {
      let value = Math.max(Math.min(width, 1100), 780);
      props.onWidthChange(value, scale);
   }, [width]);

   return (
      <div
         className={`UniformScale__wrapper${
            props.className ? " " + props.className : ""
         }`}
         ref={wrapper}
         style={wrapperStyle}
      >
         <div className="UniformScale__scaled" ref={scaled} style={scaledStyle}>
            {props.children}
         </div>
      </div>
   );
}

export default UniformScale;
