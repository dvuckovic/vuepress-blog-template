export const hashRE = /#.*$/;
export const extRE = /\.(md|html)$/;
export const endingSlashRE = /\/$/;
export const outboundRE = /^(https?:|mailto:|tel:|#)/;

export const normalize = (path) => decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '');

export const isExternal = (path) => outboundRE.test(path);

export const isMailto = (path) => /^mailto:/.test(path);

export const isTel = (path) => /^tel:/.test(path);

export const isHash = (path) => /^#/.test(path);

export const ensureExt = (path) => {
    if (isExternal(path)) {
        return path;
    }
    const hashMatch = path.match(hashRE);
    const hash = hashMatch ? hashMatch[0] : '';
    const normalized = normalize(path);

    if (endingSlashRE.test(normalized)) {
        return path;
    }
    return `${normalized }.html${ hash}`;
};

/*
 * Find parent vm by ref.
 * @param {String} ref
 * @param {Vue} vm
 * @param {any} def default value
 * @returns {Element}
 */
export const findContainerInVm = (ref, vm, def) => {
    if (!ref) return def;
    let container;
    let parent = vm;
    while (parent && !container) {
        parent = parent.$parent;
        container = parent.$refs[ref];
    }

    // Ensure it's html element (ref could be component).
    if (container && container.$el) {
        container = container.$el;
    }
    return container || def;
};
