import api_axios from "./axiosConfig";

// ***USER***

// Lister tous les projects
// GET /api/project
// projectRouter.get('/project', projectsController.listProjects)

export async function getAllProjectList() {
    return api_axios
        .get(`/project`)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log( error);
        });
}

// Trier les projets par filtre
// GET /api/project/filter?
// projectRouter.get('/project/filter', projectsController.sortByStatut)

export async function getFilteredProjectList(status) {
    return api_axios
        .get("/project/filter"+'?'+'status='+status)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log( error);
        });
}


// ***ADMIN***

// Voir toute la liste des projets 
// GET /api/admin/project
//projectRouter.get('/admin/project', projectsController.getAllProjects)
export async function getAllAdminProjects() {
    return api_axios
        .get(`/admin/project`)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log( error);
        });
}


// Trier les projets par statuts 
// GET /api/admin/project/filter?
//projectRouter.get('/admin/project/filter', projectsController.sortProjectsByStatus)
export async function getFilteredAdminProjects(status) {
    return api_axios
        .get("/admin/project/filter"+'?'+'status='+status)
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.error(error);
        });
}

// Modifier le statut 
// PATCH /api/admin/project/:idProjet
//projectRouter.patch('/admin/project:id', projectsController.updateStatus)
export async function updateProjectStatus(id, status) {
    return api_axios
        .patch(`/admin/project/${id}`,{status})
        .then(function (res) {
            console.log(res.data);
            return res.data;
        })
        .catch(function (error) {
            console.log( error);
        });
}

// Supprimer le projet 
// DELETE /api/admin/project/:idProjet
//projectRouter.delete('/admin/project:id', projectsController.deleteProject)
export async function deleteProject(id) {
    return api_axios
    .delete(`/admin/project/${id}`)
    .then(function(res) {
        console.log(res.data);
        return res.data;
    })
    .catch(function(error) {
        console.log( error);
    });
}
