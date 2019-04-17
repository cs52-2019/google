# Getting started with this repository

## Getting situated

There are two main directories in this repo: 

* [frontend](https://github.com/cs52-2019/google/tree/master/frontend) contains the React frontend app, which handles all the frontend rendering and routing.
* [backend](https://github.com/cs52-2019/google/tree/master/backend) contains the Django project and app, which handles the database and serving up information to the React app.

## Getting set up

First, clone the repository onto your computer.

### Installing Python packages

To run the Django backend, you will need Python 3, `pip`, and `virtualenv`. `pip` is a Python package manager that makes it easy to install and update packages. ([More info](https://packaging.python.org/guides/installing-using-pip-and-virtualenv/) on `pip` and `virtualenv`) For Linux and macOS, to install `pip`, run:

```python3 -m pip install --user --upgrade pip```

`virtualenv` is used to manage Python packages for different projects without their version numbers or dependencies clashing. To install `virtualenv`, run:

```python3 -m pip install --user virtualenv```

Now we'll create a Python virtual environment for this project. You only need to create it once. From the command line, navigate to where the repository has been cloned on your computer. Then run:

```
python3 -m virtualenv .env
source env/bin/activate
```

Notice that on your prompt, there's now a `(.env)` thing in front -- that means the virtual environment has been activated and you're good to go. Now let's install the Django packages.

```pip install -r requirements.txt```

You can always install more packages using `pip` in this virtual environment. Just make sure to run `pip freeze` when you're done -- that will update `requirements.txt` so that everyone else can also install the packages onto their own local virtual environments.

To deactivate the virtual environment, type run `deactivate` or just close the command line window.

#### Commands to run every time

Activate the virtual environment:

```source env/bin/activate```

and make sure there's a `(.env)` in front of your command line prompt.

### Installing React packages

Make sure you have npm (otherwise get it [here](https://www.npmjs.com/get-npm)).