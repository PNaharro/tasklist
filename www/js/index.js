/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    init();
    loadTasks(); // Cargar tareas almacenadas al inicio

    // Vincular funciones para gestionar eventos de pausa y reanudación
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
}

function init() {
    // Vincular la función addTask al nuevo botón en la página1
    $("#addTaskPage1").click(addTask);
}

function addTask() {
    var newTaskName = prompt("Introduce el nuevo nombre de la tarea:");

    if (newTaskName !== null) {
        var newElem = $("<li>").text(newTaskName);
        var editButton = $("<button>Edit</button>").click(function () {
            var updatedTaskName = prompt("Edita la tarea:", $(this).siblings('span').text());
            if (updatedTaskName !== null) {
                $(this).siblings('span').text(updatedTaskName);
                $('ul').listview("refresh");
                saveTasks();
            }
        });

        var deleteButton = $("<button>Delete</button>").click(function () {
            $(this).parent().remove();
            $('ul').listview("refresh");
            saveTasks();
        });

        newElem.append("<span>" + newTaskName + "</span>");
        newElem.append(editButton);
        newElem.append(deleteButton);

        $('ul').append(newElem);
        $('ul').listview("refresh");

        saveTasks();
    }
}

function saveTasks() {
    var tasks = [];
    $('ul li span').each(function () {
        tasks.push($(this).text());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        var tasks = JSON.parse(storedTasks);
        tasks.forEach(function (task) {
            var newElem = $("<li>").append("<span>" + task + "</span>");
            var editButton = $("<button>Edit</button>").click(function () {
                var updatedTaskName = prompt("Edita la tarea:", $(this).siblings('span').text());
                if (updatedTaskName !== null) {
                    $(this).siblings('span').text(updatedTaskName);
                    $('ul').listview("refresh");
                    saveTasks();
                }
            });

            var deleteButton = $("<button>Delete</button>").click(function () {
                $(this).parent().remove();
                $('ul').listview("refresh");
                saveTasks();
            });

            newElem.append(editButton);
            newElem.append(deleteButton);
            $('ul').append(newElem);
        });

        $('ul').listview("refresh");
    }
}

function onPause() {
    // Al suspender la aplicación, guardar las tareas
    saveTasks();
}

function onResume() {
    // Al reanudar la aplicación, cargar las tareas
    loadTasks();
}