# Bootstrap5 Component Usage Guide

## CDN Links

```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
```

## Container

```html
<!-- Responsive container -->
<div class="container">
    <!-- Content -->
</div>

<!-- Fluid container (full width) -->
<div class="container-fluid">
    <!-- Content -->
</div>

<!-- Responsive breakpoints -->
<div class="container-sm">100% wide until small breakpoint</div>
<div class="container-md">100% wide until medium breakpoint</div>
<div class="container-lg">100% wide until large breakpoint</div>
<div class="container-xl">100% wide until extra large breakpoint</div>
<div class="container-xxl">100% wide until extra extra large breakpoint</div>
```

## Grid System

```html
<div class="container">
    <!-- 12-column grid -->
    <div class="row">
        <div class="col-md-6">Column 1</div>
        <div class="col-md-6">Column 2</div>
    </div>

    <!-- Responsive columns -->
    <div class="row">
        <div class="col-12 col-md-8 col-lg-6">Responsive Column</div>
    </div>

    <!-- Equal width columns -->
    <div class="row">
        <div class="col">Column</div>
        <div class="col">Column</div>
        <div class="col">Column</div>
    </div>

    <!-- Nesting -->
    <div class="row">
        <div class="col-sm-9">
            Level 1: .col-sm-9
            <div class="row">
                <div class="col-8 col-sm-6">
                    Level 2: .col-8 .col-sm-6
                </div>
                <div class="col-4 col-sm-6">
                    Level 2: .col-4 .col-sm-6
                </div>
            </div>
        </div>
    </div>

    <!-- Gutters -->
    <div class="row g-3"> <!-- Spacing units 0-5 -->
        <div class="col-6">.col-6</div>
        <div class="col-6">.col-6</div>
    </div>
</div>
```

## Typography

```html
<!-- Headings -->
<h1>h1 heading</h1>
<h2>h2 heading</h2>
<h3>h3 heading</h3>
<h4>h4 heading</h4>
<h5>h5 heading</h5>
<h6>h6 heading</h6>

<!-- Display headings -->
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>
<h1 class="display-5">Display 5</h1>
<h1 class="display-6">Display 6</h1>

<!-- Inline text elements -->
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined.</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>

<!-- Blockquotes -->
<figure>
    <blockquote class="blockquote">
        <p>A well-known quote, contained in a blockquote element.</p>
    </blockquote>
    <figcaption class="blockquote-footer">
        Someone famous in <cite title="Source Title">Source Title</cite>
    </figcaption>
</figure>
```

## Images

```html
<!-- Responsive images -->
<img src="..." class="img-fluid" alt="...">

<!-- Image thumbnails -->
<img src="..." class="img-thumbnail" alt="...">

<!-- Alignment -->
<img src="..." class="rounded" alt="...">
<img src="..." class="float-start" alt="...">
<img src="..." class="float-end" alt="...">
```

## Tables

```html
<!-- Basic table -->
<table class="table">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>
    </tbody>
</table>

<!-- Table variants -->
<table class="table table-striped"> <!-- Zebra striping -->
<table class="table table-bordered"> <!-- Borders on all sides -->
<table class="table table-hover"> <!-- Hover state -->
<table class="table table-sm"> <!-- Compact table -->
<table class="table table-dark"> <!-- Dark table -->

<!-- Responsive table -->
<div class="table-responsive">
    <table class="table">...</table>
</div>
```

## Buttons

```html
<!-- Base button -->
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>
<button type="button" class="btn btn-link">Link</button>

<!-- Outline buttons -->
<button type="button" class="btn btn-outline-primary">Primary</button>
<button type="button" class="btn btn-outline-secondary">Secondary</button>

<!-- Button sizes -->
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-primary">Default button</button>
<button type="button" class="btn btn-primary btn-sm">Small button</button>

<!-- Block buttons -->
<div class="d-grid gap-2">
    <button class="btn btn-primary" type="button">Block button</button>
</div>

<!-- Disabled state -->
<button type="button" class="btn btn-lg btn-primary" disabled>Primary button</button>
<a href="#" class="btn btn-primary btn-lg disabled" tabindex="-1" role="button" aria-disabled="true">Primary link</a>
```

## Forms

```html
<!-- Form controls -->
<div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
</div>
<div class="mb-3">
    <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>

<!-- Form select -->
<select class="form-select" aria-label="Default select example">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
</select>

<!-- Checks and radios -->
<div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">
        Default checkbox
    </label>
</div>

<div class="form-check">
    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
    <label class="form-check-label" for="flexRadioDefault1">
        Default radio
    </label>
</div>

<!-- Input groups -->
<div class="input-group mb-3">
    <span class="input-group-text">@</span>
    <input type="text" class="form-control" placeholder="Username">
</div>

<!-- Floating labels -->
<div class="form-floating mb-3">
    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
    <label for="floatingInput">Email address</label>
</div>

<!-- Validation -->
<form class="needs-validation" novalidate>
    <div class="mb-3">
        <label for="validationCustom01" class="form-label">First name</label>
        <input type="text" class="form-control" id="validationCustom01" value="Mark" required>
        <div class="valid-feedback">
            Looks good!
        </div>
    </div>
    <div class="mb-3">
        <label for="validationCustomUsername" class="form-label">Username</label>
        <div class="input-group">
            <span class="input-group-text">@</span>
            <input type="text" class="form-control" id="validationCustomUsername" required>
            <div class="invalid-feedback">
                Please choose a username.
            </div>
        </div>
    </div>
    <button class="btn btn-primary" type="submit">Submit form</button>
</form>
```

## Navigation

```html
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!-- Breadcrumb -->
<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item"><a href="#">Library</a></li>
        <li class="breadcrumb-item active" aria-current="page">Data</li>
    </ol>
</nav>

<!-- Pagination -->
<nav aria-label="Page navigation">
    <ul class="pagination">
        <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active" aria-current="page">
            <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
            <a class="page-link" href="#">Next</a>
        </li>
    </ul>
</nav>
```

## Components

### Cards

```html
<div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>

<!-- Card with header and footer -->
<div class="card">
    <div class="card-header">
        Featured
    </div>
    <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    <div class="card-footer text-muted">
        2 days ago
    </div>
</div>
```

### Alerts

```html
<div class="alert alert-primary" role="alert">
    A simple primary alert!
</div>
<div class="alert alert-secondary" role="alert">
    A simple secondary alert!
</div>
<div class="alert alert-success" role="alert">
    A simple success alert!
</div>
<div class="alert alert-danger" role="alert">
    A simple danger alert!
</div>
<div class="alert alert-warning" role="alert">
    A simple warning alert!
</div>
<div class="alert alert-info" role="alert">
    A simple info alert!
</div>

<!-- Dismissible alert -->
<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
```

### Modals

```html
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div>
```

### Carousel

```html
<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="..." class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="...">
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>
```

### Accordion

```html
<div class="accordion" id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                Accordion Item #1
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong>
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                Accordion Item #2
            </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <strong>This is the second item's accordion body.</strong>
            </div>
        </div>
    </div>
</div>
```

## Utility Classes

### Spacing

```html
<!-- Margin -->
<div class="m-0">margin: 0</div>
<div class="m-1">margin: 0.25rem</div>
<div class="m-2">margin: 0.5rem</div>
<div class="m-3">margin: 1rem</div>
<div class="m-4">margin: 1.5rem</div>
<div class="m-5">margin: 3rem</div>
<div class="mt-3">margin-top: 1rem</div>
<div class="mb-3">margin-bottom: 1rem</div>
<div class="mx-auto">centered horizontally</div>

<!-- Padding -->
<div class="p-0">padding: 0</div>
<div class="p-3">padding: 1rem</div>
<div class="pt-3">padding-top: 1rem</div>
<div class="pb-3">padding-bottom: 1rem</div>
```

### Display

```html
<div class="d-none">display: none</div>
<div class="d-inline">display: inline</div>
<div class="d-inline-block">display: inline-block</div>
<div class="d-block">display: block</div>
<div class="d-grid">display: grid</div>
<div class="d-flex">display: flex</div>

<!-- Responsive display -->
<div class="d-none d-md-block">Hidden on mobile, visible on md and up</div>
```

### Flexbox

```html
<div class="d-flex justify-content-start">Left aligned</div>
<div class="d-flex justify-content-center">Center aligned</div>
<div class="d-flex justify-content-end">Right aligned</div>
<div class="d-flex justify-content-between">Space between</div>
<div class="d-flex justify-content-around">Space around</div>

<div class="d-flex align-items-start">Top aligned</div>
<div class="d-flex align-items-center">Middle aligned</div>
<div class="d-flex align-items-end">Bottom aligned</div>

<div class="d-flex flex-row">Row</div>
<div class="d-flex flex-column">Column</div>
```

### Colors

```html
<p class="text-primary">Primary text</p>
<p class="text-secondary">Secondary text</p>
<p class="text-success">Success text</p>
<p class="text-danger">Danger text</p>
<p class="text-warning">Warning text</p>
<p class="text-info">Info text</p>
<p class="text-muted">Muted text</p>
<p class="text-white">White text</p>

<div class="p-3 mb-2 bg-primary text-white">Primary background</div>
<div class="p-3 mb-2 bg-secondary text-white">Secondary background</div>
<div class="p-3 mb-2 bg-success text-white">Success background</div>
```

## Best Practices

1. **Use utility classes** for quick styling
2. **Customize with CSS variables** to override defaults
3. **Combine with custom CSS** for unique designs
4. **Use semantic HTML** with Bootstrap classes
5. **Ensure accessibility** with proper ARIA labels
6. **Optimize by removing unused CSS** in production
7. **Test responsive behavior** at all breakpoints
8. **Use data attributes** for component initialization
