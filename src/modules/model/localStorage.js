const buffer = [];

export function write() {
  let stringfiedBuffer = [];

  for (let item of buffer) {
    stringfiedBuffer.push(JSON.stringify(item));
  }

  stringfiedBuffer = JSON.stringify(stringfiedBuffer);

  localStorage.setItem("projects", stringfiedBuffer);
}

export function read() {
  if (JSON.parse(localStorage.getItem("projects")) != null) {
    for (let project of JSON.parse(localStorage.getItem("projects"))) {
      buffer.push(JSON.parse(project));
    }
  }
}

export function getBuffer() {
  return buffer;
}

export function showBuffer() {
  console.log(buffer);
}
