import './style.scss';
document.addEventListener('DOMContentLoaded', _ => {
  const colorPicker = document.querySelector('.color--picker'),
    inputs = colorPicker.querySelectorAll('.color--picker--input'),
    areas = colorPicker.querySelectorAll('.color--picker--visualizer--area'),
    saveBtn = colorPicker.querySelector('.color--picker--save--button'),
    info = colorPicker.querySelector('.color--picker--user--info'),
    states = {
      errUp: false,
      lastError: '',
      lastColor: inputs[0].value,
      selectedArea: false
    },
    exp = /^(#?([a-f\d]{3}|[a-f\d]{6})|rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\s?,\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\s?,\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)|rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\s?,\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\s?,\s?(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\s?,\s?(0?\.\d|1(\.0)?)\)|hsl\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d)\s?,\s?(0|100|\d{1,2})%\s?,\s?(0|100|\d{1,2})%\)|hsla\((0|360|35\d|3[0-4]\d|[12]\d\d|0?\d?\d)\s?,\s?(0|100|\d{1,2})%\s?,\s?(0|100|\d{1,2})%\s?,\s?(0?\.\d|1(\.0)?)\))$/;


  inputs[1].value = inputs[0].value;
  areas.forEach(area => {
    // area.style.backgroundColor = '#333333';
    let bgColor = window.getComputedStyle(area, null).getPropertyValue('background-color');
    console.log(bgColor);
    bgColor = rgbToHex(bgColor);

    area.setAttribute('data-color', bgColor);
  });
  let delay = '';

  function chooseTimeout(fun, nbr) {
    return setTimeout(fun, nbr);
  }

  function displayMessage(str) {
    if (str !== '') {
      if (delay && states.errUp === true) {
        clearTimeout(delay);
      }

      function toggleMessage() {
        info.classList.toggle('shown', false);
        states.errUp = false;
      }

      delay = chooseTimeout(toggleMessage, 3000);

      info.innerText = str;
      info.classList.toggle('shown', true);
      states.errUp = true;
    }
  }
  console.log(hslToHex('hsl(200, 10%, 20%)'))

  function hslToHex(hslColor) {

    hslColor = hslColor.replace(/\D/g, ' ');
    hslColor = hslColor.split(' ');
    hslColor = hslColor.filter(value => {
      return value !== '';
    });
    console.log(hslColor);
    let h = hslColor[0],
      s = hslColor[1],
      l = hslColor[2],
      r, g, b;
    h /= 360;
    s /= 100;
    l /= 100;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function rgbToHex(rgbColor) {
    rgbColor = rgbColor.replace(/\D/g, ' ');
    rgbColor = rgbColor.split(' ');
    rgbColor = rgbColor.filter(value => {
      return value !== '';
    });
    let r = rgbColor[0],
      g = rgbColor[1],
      b = rgbColor[2];
    let hexStr = '#',
      err = '';
    if (r > 0 && r <= 255) {
      r = Number(r);
      if (r < 16) hexStr += "0";
      hexStr += r.toString(16);
      if (g > 0 && g <= 255) {
        g = Number(g);
        if (g < 16) hexStr += "0";
        hexStr += g.toString(16);
        if (b > 0 && b <= 255) {
          b = Number(b);
          if (b < 16) hexStr += "0";
          hexStr += b.toString(16);
        } else {
          err = 'blue value is invalid';
        }
      } else {
        err = 'green value is invalid';
      }
    } else {
      err = 'red value is invalid';
    }
    if (err) displayMessage(err);
    return hexStr;
  }

  function setUpListeners() {

    inputs[1].addEventListener('change', e => {
      let msg = '';
      if (!states.validTextInput) {
        msg = "Please enter a valid hex, rgb, hsl color."
      } else {
        // if(states.selectedArea) {
        //   states.selectedArea.style.backgroundColor = inputs[0].value;
        //   states.selectedArea.setAttribute('data-color', inputs[0].value);
        //   msg = 'Color saved :)';
        // }else {
        //   msg = 'Please select an area';
        // }
        // states.lastColor = inputs[1].value = inputs[0].value;
      }
      displayMessage(msg);
    })
    inputs[1].addEventListener('blur', e => {

      e.target.style.outline = '';
    }, false)
  }

  function hex3ToHex6(hexStr) {
    hexStr = '#' + hexStr.substr(1, 1) + hexStr.substr(1, 1) + hexStr.substr(2, 1) + hexStr.substr(2, 1) + hexStr.substr(3, 1) + hexStr.substr(3, 1);

    return hexStr;
  }
  // console.log(rgbToHex(255, 20, 30));
  inputs.forEach((input, index, inputs) => {
    input.addEventListener('input', e => {

      if (input.getAttribute('type') === 'text') {

        if (input.value !== '' && exp.exec(input.value) !== null) {
          // console.log(input.value);
          let color = input.value,
            msg;
          if (color.substr(0, 1) === '#') {
            if (color.length === 4) {
              color = hex3ToHex6(color);
            }
            inputs[0].value = color;
            inputs[1].style.outline = '1px solid green';
          }
          // rgba(1,1,1,1)
          if (color.substr(0, 3) === 'rgb' && color.substr(3, 1) !== 'a') {

            let hexColor = rgbToHex(color);

            inputs[0].value = hexColor;
            inputs[1].style.outline = '1px solid green';

          } else if (color.substr(0, 3) === 'hsl' && color.substr(3, 1) !== 'a') {


            let hexColor = hslToHex(color);

            inputs[0].value = hexColor;
            inputs[1].style.outline = '1px solid green';

          } else if (color.substr(0, 4) === 'rgba') {

            let hexColor = rgbToHex(color);

            console.log(hexColor);
            inputs[0].value = hexColor;
            inputs[1].style.outline = '1px solid green';

          } else if (color.substr(0, 4) === 'hsla') {
            console.log(color);
            color = color.replace(/\s+/g, '');
            inputs[1].style.outline = '1px solid green';
          }
          states.validTextInput = true;
        } else {
          states.validTextInput = false;
          inputs[1].style.outline = '1px solid red';
        }
      }
      if (input.getAttribute('type') === 'color') {
        inputs[1].value = inputs[0].value;
      }

    }, false)
  });

  function unselect(e) {
    if (states.selectedArea && !e.path.includes(states.selectedArea) && !e.path.includes(inputs[0]) && !e.path.includes(inputs[1]) && !e.path.includes(saveBtn)) {
      console.log(e.path);
      states.selectedArea.classList.toggle('selected', false);
      states.selectedArea = false;
    } else {
      console.log(e.path);
    }
  }
  areas.forEach((area, index, areas) => {
    area.addEventListener('click', e => {
      states.selectedArea = e.target;
      areas.forEach(area => {
        area.classList.toggle('selected', false);
      })
      area.classList.add('selected');
    }, false)
  })
  window.addEventListener('click', unselect, false);
  saveBtn.addEventListener('click', e => {
    let msg = '';
    if (states.selectedArea) {
      states.selectedArea.style.backgroundColor = inputs[0].value;
      states.selectedArea.setAttribute('data-color', inputs[0].value);
      msg = 'Color saved :)';
    } else {
      msg = 'Please select an area';
    }
    states.lastColor = inputs[1].value = inputs[0].value;
    displayMessage(msg);
    console.log(states);
  });
  setUpListeners();
  // console.log(inputs);
})