function mergePatch(target, patch) {
    if (typeof patch === 'object' && patch !== null) {
        if (Array.isArray(patch)) {
            // Replace arrays entirely
            return patch;
        }
        if (typeof target !== 'object' || target === null || Array.isArray(target)) {
            target = {};
        }
        for (const key in patch) {
            if (patch[key] === null) {
                delete target[key];
            } else {
                target[key] = mergePatch(target[key], patch[key]);
            }
        }
        return target;
    } else {
        return patch;
    }
}

module.exports = mergePatch;
