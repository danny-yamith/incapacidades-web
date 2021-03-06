/**
 * Formates file size.
 *
 * @param {Number|String} size
 */
export const formatFileSize = (size) => {
  const units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const threshold = 1024;
  size = Number(size) * threshold;
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));
  return `${(size / Math.pow(threshold, i)).toFixed(2) * 1} ${units[i]}`;
};

/**
 * Checks if vee-validate is defined globally.
 */
export const isDefinedGlobally = () => {
  return typeof VeeValidate !== 'undefined';
};

const messages = {
  _default: (field) => `El campo '${field}' no es válido.`,
  after: (field, [target, inclusion]) => `El campo '${field}' debe ser posterior ${inclusion ? 'o igual ' : ''}a ${target}.`,
  alpha: (field) => `El campo '${field}' solo debe contener letras.`,
  alpha_dash: (field) => `El campo '${field}' solo debe contener letras, números y guiones.`,
  alpha_num: (field) => `El campo '${field}' solo debe contener letras y números.`,
  alpha_spaces: (field) => `El campo '${field}' solo debe contener letras y espacios.`,
  before: (field, [target, inclusion]) => `El campo '${field}' debe ser anterior ${inclusion ? 'o igual ' : ''}a ${target}.`,
  between: (field, [min, max]) => `El campo '${field}' debe estar entre ${min} y ${max}.`,
  confirmed: (field) => `El campo '${field}' no coincide.`,
  credit_card: (field) => `El campo '${field}' es inválido.`,
  date_between: (field, [min, max]) => `El campo '${field}' debe estar entre ${min} y ${max}.`,
  date_format: (field, [format]) => `El campo '${field}' debe tener un formato ${format}.`,
  decimal: (field, [decimals = '*'] = []) => `El campo '${field}' debe ser numérico y contener${!decimals || decimals === '*' ? '' : ' ' + decimals} puntos decimales.`,
  digits: (field, [length]) => `El campo '${field}' debe ser numérico y contener exactamente ${length} dígitos.`,
  dimensions: (field, [width, height]) => `El campo '${field}' debe ser de ${width} píxeles por ${height} píxeles.`,
  email: (field) => `El campo '${field}' debe ser un correo electrónico válido.`,
  excluded: (field) => `El campo '${field}' debe ser un valor válido.`,
  ext: (field) => `El campo '${field}' debe ser un archivo válido.`,
  image: (field) => `El campo '${field}' debe ser una imagen.`,
  included: (field) => `El campo '${field}' debe ser un valor válido.`,
  integer: (field) => `El campo '${field}' debe ser un entero.`,
  ip: (field) => `El campo '${field}' debe ser una dirección ip válida.`,
  length: (field, [length, max]) => {
    if (max) {
      return `El largo del campo '${field}' debe estar entre ${length} y ${max}.`;
    }

    return `El largo del campo '${field}' debe ser ${length}.`;
  },
  max: (field, [length]) => `El campo '${field}' no debe ser mayor a ${length} caracteres.`,
  max_value: (field, [max]) => `El campo '${field}' debe de ser ${max} o menor.`,
  mimes: (field) => `El campo '${field}' debe ser un tipo de archivo válido.`,
  min: (field, [length]) => `El campo '${field}' debe tener al menos ${length} caracteres.`,
  min_value: (field, [min]) => `El campo '${field}' debe ser ${min} o superior.`,
  numeric: (field) => `El campo '${field}' debe contener solo caracteres numéricos.`,
  regex: (field) => `El formato del campo '${field}' no es válido.`,
  required: (field) => `El campo '${field}' es obligatorio.`,
  size: (field, [size]) => `El campo '${field}' debe ser menor a ${formatFileSize(size)}.`,
  url: (field) => `El campo '${field}' no es una URL válida.`,
  exist(field, [ searchTermValue, searchTermName, loading ]) {
    if(!searchTermValue) return `No se puede buscar un registro con el '${searchTermName}' vacio`
    return `El '${field}' no ha sido encontrado con el '${searchTermName}': ${searchTermValue}, o no tiene contratos vigentes`
  },
};

const locale = {
  name: 'es',
  messages,
  attributes: {}
};

if (isDefinedGlobally()) {
  // eslint-disable-next-line
  VeeValidate.Validator.localize({ [locale.name]: locale });
}

export default locale;