export class Dom {

  hasCls(dom: HTMLElement, className: string) {
    let cls = dom.className;
    if (cls) {
      return dom.className.split(' ').indexOf(className) > -1
    }
    return false
  }

  addCls(dom: HTMLElement, className: string) {
    if (!this.hasCls(dom,className)) {
      dom.className = dom.className + ' ' + className;
    }
  }

  removeCls(dom: HTMLElement, className: string) {
    if (this.hasCls(dom,className)) {
      let cls = dom.className.split(' ');
      cls.splice(cls.indexOf(className),1);
      dom.className = cls.join(' ');
    }
  }

  toggleCls(dom: HTMLElement, className: string) {
    let added = false;
    if (this.hasCls(dom,className)) {
      this.removeCls(dom,className);
    } else {
      this.addCls(dom,className);
      added = true;
    }
    return added;
  }

  replaceCls(dom: HTMLElement, oldClassName: string, newClassName: string) {
    this.removeCls(dom, oldClassName);
    this.addCls(dom, newClassName);
  }

  parseCls(dom: HTMLElement, separator: string) {
    let arr = dom.className.split(separator)
    if (arr.length > 1) {
      return arr[1].split(' ')[0];
    }
    return '';
  }

  parseClsInt(dom: HTMLElement, separator: string) {
    let val = this.parseCls(dom, separator);
    return val ? parseInt(val) : -1;
  }

  // selector: class name(.class-name) or tag name (mc-componentname)
  findParent(dom: any, selector: string, depth: number = 5) {
    let cls = '';
    let resultDom: any;
    if (selector[0] === '.') {
      cls = selector.split('.')[1];
    }

    while(depth--) {
      if (cls) {
        if (this.hasCls(dom,cls)) {
          resultDom = dom;
          break;
        }
      } else {
        if (dom.nodeName.toLowerCase() === selector.toLowerCase()) {
          resultDom = dom;
          break;
        }
      }
      dom = dom.parentNode;
    }
    return resultDom;
  }

  getSize(dom: HTMLElement) {
    let size = {width: dom.offsetWidth, height: dom.offsetHeight}
    let style = dom.style;
    if (style.display === 'none') {
      style.visibility = 'hidden';
      style.display = '';
      size = {width: dom.offsetWidth, height: dom.offsetHeight};
      style.visibility = '';
      style.display = 'none';
    } else if (style.height === '0' || style.height === '0px') {
      style.visibility = 'hidden';
      let position = style.position || '';
      style.position = 'absolute';
      style.height = '';
      size = {width: dom.offsetWidth, height: dom.offsetHeight};
      style.visibility = '';
      style.height = '0px';
      style.position = position;
    }

    return size;
  }
}