<script>
  import { push } from "svelte-spa-router";
  import { getContext, onMount } from "svelte";
  const monumentService = getContext("MonumentService");
  export let addMonumentAction;
  export let existingMonumentRecord;

  // let monument;
  // let id;
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

  onMount(async () => {
    categories = await monumentService.getNonProvinceCategories();

    categories.forEach((category) => {
      categoryTitles.push(category.title);
    });

    if (existingMonumentRecord) {
      title = existingMonumentRecord.title;
      description = existingMonumentRecord.description;
      province = existingMonumentRecord.province;
      county = existingMonumentRecord.county;
      longitude = existingMonumentRecord.coordinates.longitude;
      latitude = existingMonumentRecord.coordinates.latitude;

      let dummyEventObject = {
        target: {
          value: province,
        },
      };
      populateCountyField(dummyEventObject);

      countySelectField.value = existingMonumentRecord.county;

      let selectedCategoryTitles = [];
      selectedCategories = existingMonumentRecord.categories;
      //DUMMY FOR TEST
      // selectedCategories = [{ title: "Castle" }];
      for (let category in selectedCategories) {
        selectedCategoryTitles.push(selectedCategories[category]["title"]);
      }

      if (selectedCategoryTitles.length > 0) {
        for (let category in categories) {
          if (selectedCategoryTitles.includes(categories[category].title)) {
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

  let removePriorImagePreviewElements = (e) => {
    let imgPreviewElems = preview.children;
    Array.from(imgPreviewElems).forEach(function (element) {
      preview.removeChild(element);
    });
  };

  let readImageFiles = async function (input) {
    console.log(input);
    console.log(input.target.files);
    images = input.target.files;
    let allFiles = input.target.files;
    if (allFiles.length < 2 && allFiles.length > 0) {
      let file = input.target.files[0];
      let fileName = input.target.files[0].name;
      let reader = new FileReader();
      if (preview.childNodes.length < 1) {
        reader.onload = function () {
          let imageResult = imgPreviewLi(reader.result, fileName);
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
          preview.append(imageResult);
        };
        reader.readAsDataURL(file);
        reader.onerror = function () {
          console.log(reader.error);
        };
      }
    }
  };

  let addMonumentFunction = async function addMonument() {
    let monument = {
      title: title,
      description: description,
      province: province,
      county: county,
      category: checkedCategories,
      longitude: longitude,
      latitude: latitude,
      images: images,
    };

    console.log(monument);
    let success = await monumentService.addMonument(monument);
    console.log(success);
    if (success) {
      push("/report");
    } else {
      console.log("failing on addition of monument");
    }
  };

  let editMonumentFunction = async function editMonument() {
    console.log("EDITING");
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
              type="text"
              name="title"
              placeholder="Enter Monument Title"
            />
          </div>
        </div>
        <div class="uk-margin">
          <div class="uk-form-label">Description</div>
          <div class="uk-form-controls">
            <textarea
              bind:value={description}
              class="uk-textarea"
              id="form-stacked-text"
              type="text"
              name="description"
              placeholder="Enter Monument Description"
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
                class="uk-input"
                id="form-stacked-text"
                type="number"
                step=".0001"
                name="latitude"
                placeholder="Enter Monument Latitude"
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
                class="uk-input"
                id="form-stacked-text"
                type="number"
                step=".0001"
                name="longitude"
                placeholder="Enter Monument Longitude"
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

        <!-- {#each categoryTitles as individualCategory}
              <div class="uk-width-expand@m">
                <input
                  class="uk-checkbox"
                  name="category"
                  on:click={manipulateCheckedCategoryTitles}
                  value={individualCategory}
                />
                {individualCategory}
              </div>
            {/each}
          </div>
        {/if} -->

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
  </form>
</div>
