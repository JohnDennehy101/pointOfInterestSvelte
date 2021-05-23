<script>
  import { push } from "svelte-spa-router";
  import { getContext, onMount } from "svelte";
  const monumentService = getContext("MonumentService");
  import { LeafletMap } from "../services/leaflet-map";
  import "leaflet/dist/leaflet.css";
  export let addMonumentAction;
  export let existingMonumentRecord;
  export let mapObject;

  // let monument;
  let id;
  let error;
  let categoryTitles = [];
  let checkedCategories = [];
  let countySelectField;
  let countyContainer;
  let title = "";
  let description = "";
  let province = "";
  let county = "";
  let longitude = "";
  let latitude = "";
  let images;
  let categories;
  let selectedCategories;
  let preview;
  let newCategoryTitle;
  let categoryDivContainer;
  let marker;

  let addMapMarkerAndZoom = () => {
    if (latitude && longitude && title) {
      mapObject.imap._layers = {};
      marker = mapObject.addMarker({ lat: latitude, lng: longitude }, title);

      mapObject.moveTo(12, { lat: latitude, lng: longitude });
    }
  };

  onMount(async () => {
    categories = await monumentService.getNonProvinceCategories();

    categories.forEach((category) => {
      categoryTitles.push(category.title);
    });

    if (!mapObject) {
      addMapMarkerAndZoom = fieldStyling;
    }

    if (existingMonumentRecord) {
      title = existingMonumentRecord.title;
      description = existingMonumentRecord.description;
      province = existingMonumentRecord.province;
      county = existingMonumentRecord.county;
      console.log(county);
      console.log("County on mount");
      longitude = existingMonumentRecord.coordinates.longitude;
      latitude = existingMonumentRecord.coordinates.latitude;
      id = existingMonumentRecord._id;

      let dummyEventObject = {
        target: {
          value: province,
        },
      };
      populateCountyField(dummyEventObject);

      countySelectField.value = existingMonumentRecord.county;
      county = existingMonumentRecord.county;

      let selectedCategoryTitles = [];
      selectedCategories = existingMonumentRecord.categories;
      //DUMMY FOR TEST
      // selectedCategories = [{ title: "Castle" }];
      for (let category in selectedCategories) {
        selectedCategoryTitles.push(selectedCategories[category]["title"]);
      }

      console.log(selectedCategoryTitles);

      if (selectedCategoryTitles.length > 0) {
        for (let category in categories) {
          if (selectedCategoryTitles.includes(categories[category].title)) {
            checkedCategories.push(categories[category].title);
            categories[category].checked = true;
          }
        }
      }
    }
  });
  const munsterCounties = [
    "Cork",
    "Clare",
    "Kerry",
    "Limerick",
    "Tipperary",
    "Waterford",
  ];
  const leinsterCounties = [
    "Dublin",
    "Wicklow",
    "Kildare",
    "Meath",
    "Westmeath",
    "Offaly",
    "Kilkenny",
    "Laois",
    "Wexford",
    "Carlow",
    "Louth",
  ];
  const connachtCounties = [
    "Galway",
    "Mayo",
    "Sligo",
    "Roscommon",
    "Sligo",
    "Leitrim",
  ];
  const ulsterCounties = [
    "Antrim",
    "Derry",
    "Down",
    "Donegal",
    "Fermanagh",
    "Cavan",
    "Tyrone",
    "Armagh",
    "Monaghan",
  ];

  function createCountyOptions(provinceCountyArray) {
    for (county in provinceCountyArray) {
      let countyOption = document.createElement("option");
      countyOption.textContent = provinceCountyArray[county];
      countyOption.value = provinceCountyArray[county];
      countySelectField.appendChild(countyOption);
    }
  }

  function createDefaultOption() {
    let disabledOption = document.createElement("option");
    disabledOption.value = "";
    disabledOption.textContent = "Select County";
    disabledOption.disabled = true;
    disabledOption.defaultSelected = true;
    countySelectField.appendChild(disabledOption);
  }

  function deletePreviousCountyOptions(countySelectField) {
    while (countySelectField.childNodes.length) {
      countySelectField.removeChild(countySelectField.lastChild);
    }
  }

  let populateCountyField = (e) => {
    countyContainer.style.display = "block";

    deletePreviousCountyOptions(countySelectField);

    createDefaultOption();
    if (e.target.value === "Munster") {
      createCountyOptions(munsterCounties);
    } else if (e.target.value === "Leinster") {
      createCountyOptions(leinsterCounties);
    } else if (e.target.value === "Connacht") {
      createCountyOptions(connachtCounties);
    } else if (e.target.value === "Ulster") {
      createCountyOptions(ulsterCounties);
    }

    county = undefined;
  };

  let changeCountyValue = (e) => {
    county = e.target.value;
  };

  let manipulateCheckedCategoryTitles = (e) => {
    if (e.target.checked) {
      checkedCategories.push(e.target.value);
    } else if (!e.target.checked) {
      checkedCategories.splice(checkedCategories.indexOf(e.target.value), 1);
    }
  };

  let addNewCategory = () => {
    if (
      newCategoryTitle.length > 1 &&
      !categoryTitles.includes(newCategoryTitle)
    ) {
      let checkboxParentDiv = document.createElement("div");
      checkboxParentDiv.classList.add("uk-width-expand@m");
      let checkboxLabel = document.createElement("label");
      checkboxLabel.innerHTML = `<input class="uk-checkbox" bind:group=${checkedCategories} name="category" value=${newCategoryTitle} type="checkbox"> ${newCategoryTitle}`;
      checkboxLabel.addEventListener("click", manipulateCheckedCategoryTitles);
      checkboxParentDiv.appendChild(checkboxLabel);
      categoryDivContainer.appendChild(checkboxParentDiv);
      categoryTitles.push(newCategoryTitle);

      newCategoryTitle = "";
    }
  };

  function imgPreviewLi(readerResult, filename) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const img = document.createElement("img");
    const span = document.createElement("span");
    li.className = "list-item uk-margin-medium-top";
    div.className = "uk-cover-container";
    img.className = "delete-img-preview";
    img.setAttribute("id", "img-preview-responsive");
    img.setAttribute("src", readerResult);
    img.setAttribute("name", "image");
    img.setAttribute("data-name", filename);
    img.setAttribute("alt", "file-image-preview");
    span.className = "uk-text-meta uk-text-break file-upload-name";
    span.textContent = filename;
    div.append(img);
    li.append(div, span);
    return li;
  }

  function editMonumentPreviewImages(readerResult) {
    // removeImageDisplayElements();
    let imagesList = document.getElementById("imagesList");
    console.log(imagesList);
    const li = document.createElement("li");
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", "600");
    canvas.setAttribute("height", "900");
    const img = document.createElement("img");
    img.setAttribute("src", readerResult);
    img.setAttribute("uk-img", "target: !.uk - slideshow - items");
    li.appendChild(img);
    li.appendChild(canvas);
    imagesList.appendChild(li);
  }

  let removePriorImagePreviewElements = (e) => {
    let imgPreviewElems = preview.children;
    Array.from(imgPreviewElems).forEach(function (element) {
      preview.removeChild(element);
    });
  };

  let removeImageDisplayElements = () => {
    let imagesList = document.getElementById("imagesList");
    while (imagesList.children.length > 0) {
      let individualImage = imagesList.children[0];
      individualImage.parentNode.removeChild(individualImage);
    }
  };

  let readImageFiles = async function (input) {
    if (!addMonumentAction) {
      removeImageDisplayElements();
    }

    images = input.target.files;
    let allFiles = input.target.files;
    if (allFiles.length < 2 && allFiles.length > 0) {
      let file = input.target.files[0];
      let fileName = input.target.files[0].name;
      let reader = new FileReader();
      if (preview.childNodes.length < 1) {
        reader.onload = function () {
          let imageResult = imgPreviewLi(reader.result, fileName);
          if (!addMonumentAction) {
            editMonumentPreviewImages(reader.result);
          }

          preview.append(imageResult);
        };
        reader.readAsDataURL(file);
        reader.onerror = function () {
          console.log(reader.error);
        };
      }
    } else if (allFiles.length >= 2) {
      let file = "";

      for (let i = 0; i < allFiles.length; i++) {
        let file = await allFiles[i];
        let fileName = allFiles[i].name;
        let reader = new FileReader();
        reader.onload = function () {
          let imageResult = imgPreviewLi(reader.result, fileName);

          if (!addMonumentAction) {
            editMonumentPreviewImages(reader.result);
          }

          preview.append(imageResult);
        };
        reader.readAsDataURL(file);
        reader.onerror = function () {
          console.log(reader.error);
        };
      }
    }
  };

  let fieldStyling = (e) => {
    if (e.target.value.length < 1) {
      e.target.classList.add("uk-form-danger");
    } else {
      e.target.classList.remove("uk-form-danger");
    }
  };

  let addMonumentFunction = async function addMonument() {
    let monument;
    let success;

    monument = {
      title: title,
      description: description,
      province: province,
      county: county,
      category: checkedCategories,
      longitude: longitude,
      latitude: latitude,
      images: images,
    };
    try {
      success = await monumentService.addMonument(monument);
    } catch (Error) {
      error = "Error adding new monument record. Please try again.";
    }

    console.log(success);
    if (success) {
      push("/report");
    } else {
      error = "Error adding new monument record. Please try again.";
    }
  };

  let editMonumentFunction = async function editMonument() {
    if (checkedCategories.length === 0) {
      checkedCategories = [];
    }
    let monument = {
      title: title,
      description: description,
      province: province,
      county: county,
      category: checkedCategories,
      longitude: longitude,
      latitude: latitude,
      images: images,
      _id: id,
    };

    let success = await monumentService.editMonument(monument);
    console.log(success);
    if (success) {
      push("/report");
    } else {
      error = "Error adding new monument record. Please try again.";
    }
  };

  let actionMonument;

  if (addMonumentAction) {
    actionMonument = addMonumentFunction;
  } else {
    actionMonument = editMonumentFunction;
  }
</script>

<div
  class="uk-margin uk-width-2xlarge uk-margin-auto uk-card uk-card-default uk-card-body uk-box-shadow-large"
>
  {#if !addMonumentAction}
    <h3 class="uk-card-title uk-text-center">Edit Monument</h3>
  {/if}
  <form
    on:submit|preventDefault={actionMonument}
    class="uk-form-stacked uk-text-left"
    enctype="multipart/form-data"
  >
    <div class="uk-grid uk-grid-stack">
      <div class="uk-width-1@m">
        <div class="uk-margin">
          <label class="uk-form-label" for="form-stacked-text"
            >Monument Title</label
          >
          <div class="uk-form-controls">
            <input
              bind:value={title}
              class="uk-input"
              id="form-stacked-text"
              on:change={fieldStyling}
              type="text"
              name="title"
              placeholder="Enter Monument Title"
              required
            />
          </div>
        </div>
        <div class="uk-margin">
          <div class="uk-form-label">Description</div>
          <div class="uk-form-controls">
            <textarea
              bind:value={description}
              on:change={fieldStyling}
              class="uk-textarea"
              id="form-stacked-text"
              type="text"
              name="description"
              placeholder="Enter Monument Description"
              required
            />
          </div>
        </div>
        <div class="uk-margin">
          <div class="uk-form-label">Province</div>
          <select
            on:change={populateCountyField}
            bind:value={province}
            class="uk-select"
            name="province"
            id="provinceSelectField"
          >
            <option value="" disabled selected>Select Province</option>
            <option>Connacht</option>
            <option>Munster</option>
            <option>Leinster</option>
            <option>Ulster</option>
          </select>
        </div>

        <div
          bind:this={countyContainer}
          class="uk-margin"
          style="display:none"
          id="countyContainer"
        >
          <div class="uk-form-label">County</div>
          <select
            on:change={changeCountyValue}
            bind:this={countySelectField}
            class="uk-select"
            name="county"
            id="countySelectField"
            required
          >
            <option value="" disabled selected>Select County</option>
          </select>
        </div>

        <div class="uk-margin" uk-grid>
          <div class="uk-width-1-2@m">
            <label class="uk-form-label" for="form-stacked-text">Latitude</label
            >
            <div class="uk-form-controls">
              <input
                bind:value={latitude}
                on:change={addMapMarkerAndZoom}
                class="uk-input"
                id="form-stacked-text"
                type="number"
                step=".000000000000001"
                name="latitude"
                placeholder="Enter Monument Latitude"
                required
              />
            </div>
          </div>
          <div class="uk-width-1-2@m">
            <label class="uk-form-label" for="form-stacked-text"
              >Longitude</label
            >
            <div class="uk-form-controls">
              <input
                bind:value={longitude}
                on:change={addMapMarkerAndZoom}
                class="uk-input"
                id="form-stacked-text"
                type="number"
                step=".0000000000000001"
                name="longitude"
                placeholder="Enter Monument Longitude"
                required
              />
            </div>
          </div>
        </div>

        {#if categories}
          <div
            bind:this={categoryDivContainer}
            class="uk-margin"
            id="categoryDivContainer"
          >
            <div class="uk-form-label">Existing Categories</div>
            {#each categories as individualCategory}
              <div class="uk-width-expand@m">
                <input
                  checked={individualCategory.checked}
                  class="uk-checkbox"
                  name="category"
                  value={individualCategory.title}
                  on:click={manipulateCheckedCategoryTitles}
                  type="checkbox"
                />
                {individualCategory.title}
              </div>
            {/each}
          </div>
        {/if}

        <div class="uk-margin">
          <div class="uk-form-label">New Category</div>
          <div class="uk-form-controls">
            <input
              class="uk-input"
              bind:value={newCategoryTitle}
              id="newCategoryInputField"
              type="text"
              placeholder="Enter Category Title"
            />
          </div>

          <button
            on:click={addNewCategory}
            class="uk-button uk-button-default uk-margin-top"
            id="addNewCategoryButton"
            type="button"
            tabindex="-1">Add Category</button
          >
        </div>
      </div>

      <div class="uk-margin">
        <div class="uk-form-label">Image</div>
        <div uk-form-custom on:click={removePriorImagePreviewElements}>
          <input
            type="file"
            on:change={readImageFiles}
            accept="image/x-png,image/gif,image/jpeg"
            name="imageUpload"
            id="imageInput"
            multiple
          />
          <button
            class="uk-button uk-button-secondary"
            type="button"
            tabindex="-1"
            name="test">Add Monument Image</button
          >
        </div>
        <!-- {{> error}} -->
      </div>

      <ul
        bind:this={preview}
        id="preview"
        class="uk-list uk-grid-match uk-child-width-1-2 uk-child-width-1-4@l uk-child-width-1-5@xl uk-text-center"
        uk-grid
        uk-scrollspy="cls: uk-animation-scale-up; target: .list-item; delay: 80"
      />

      <div class="uk-width-1@m">
        <div class="uk-margin">
          <button
            class="submit uk-button uk-margin-top uk-button-primary uk-button-large uk-width-1-1"
            >Add Monument</button
          >
        </div>
      </div>
    </div>
    {#if error}
      <div class="uk-margin uk-text-left uk-alert">
        <div class="uk-text">There was a problem...</div>
        <ul class="uk-list uk-list-disc">
          <li>{error}</li>
        </ul>
      </div>
    {/if}
  </form>
</div>
