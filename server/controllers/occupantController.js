const Occupant = require("../models/Occupant");

// Get all occupants
const getOccupants = async (req, res) => {
  try {
    const occupants = await Occupant.find().sort({ joinedDate: -1 });

    res.status(200).json({
      success: true,
      count: occupants.length,
      data: occupants,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Add a new occupant
const addOccupant = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    const existing = await Occupant.findOne({ phoneNumber });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Occupant already exists.",
      });
    }

    const occupant = await Occupant.create({
      name,
      phoneNumber,
    });

    res.status(201).json({
      success: true,
      message: "Occupant added successfully.",
      data: occupant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const updateOccupant = async (req, res) => {
    try {

        const occupant = await Occupant.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!occupant) {
            return res.status(404).json({
                success: false,
                message: "Occupant not found",
            });
        }

        res.json({
            success: true,
            message: "Occupant updated successfully.",
            data: occupant,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    addOccupant,
    getOccupants,
    updateOccupant,
};