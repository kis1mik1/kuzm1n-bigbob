export const store = {
  get(k, d) {
    try {
      const v = localStorage.getItem('mk_' + k);
      return v === null ? d : JSON.parse(v);
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem('mk_' + k, JSON.stringify(v));
    } catch (e) {}
  }
};
