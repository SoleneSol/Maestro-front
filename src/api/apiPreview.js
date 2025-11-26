import api_axios from "./axiosConfig.js";

export async function getAllPreviews() {
    return api_axios
        .get(`/preview`)
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function getPreviewById(id) {
    return api_axios
        .get(`/preview/${id}`)
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function getAllStarPreviews() {
    return api_axios
        .get('/preview/star')
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        })
}

export async function filterByGenre(genre) {
    return api_axios
    .get("/preview/filter"+'?'+'genre='+genre)
    .then(function (res) {
        return res.data;
    })
    .catch(function (error) {
        console.log(error);
    });
}

export async function getAllGenres() {
    return api_axios
        .get(`/genre`)
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log( error);
        });
}

export async function addPreview(formData) {
    return api_axios
        .post('/admin/preview', formData, {
            header: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function updatePreview(id, newPreviewData) {
    return api_axios
        .patch(`/admin/preview/${id}`, newPreviewData)
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function deletePreview(id) {
    return api_axios
        .delete(`/admin/preview/${id}`)
        .then(function (res) {
            return res.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}