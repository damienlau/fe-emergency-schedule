const facetime = (action, target) => {
  const prefix = "tideen://";
  const params = {
    user: "system",
    pwd: "123456",
    // server: "127.0.0.1",
    // prot: 8990,
    action: action,
    target: target,
  };

  const obj = [];

  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      obj.push(params[key]);
    }
  }

  const config = prefix + obj.join(",");

  window.location.href = config;
};

export default facetime;
