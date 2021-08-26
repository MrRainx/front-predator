const encode = (data: any) => jsonEncode(JSON.stringify(data));

const jsonEncode = (json: any) => Buffer.from(json).toString('base64');

const decode = (b64: string) => {
  return JSON.parse(Buffer.from(b64, 'base64').toString('ascii'));
};

const B64 = {
  encode,
  jsonEncode,
  decode,
};

export default B64;
