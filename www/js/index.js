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
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    init();
}

function init(){
    // Vincular la función addTask al nuevo botón en la página1
    $("#addTaskPage1").click(addTask);
}

function addTask(){
    // Solicitar al usuario el nuevo nombre para la tarea
    var newTaskName = prompt("Introduce el nuevo nombre de la tarea:");

    if (newTaskName !== null) {  // Verificar si el usuario ha introducido un nombre
        var newElem = $("<li>").text(newTaskName);  // Usar el nuevo nombre en lugar de "new element"
        var button = $("<button>X</button>").click(function(){
            // Eliminar el elemento de la lista al hacer clic en el botón de eliminar
            $(this).parent().remove();
            // Actualizar el listview para aplicar los estilos
            $('ul').listview("refresh");
        });

        // Agregar el botón de eliminar al elemento de la lista
        newElem.append(button);

        // Agregar el elemento de la lista al final de la lista
        $('ul').append(newElem);

        // Actualizar el listview para aplicar los estilos
        $('ul').listview("refresh");
    }
}
